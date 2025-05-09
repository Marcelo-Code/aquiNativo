import { supabaseClient } from "../config/config";

export const getPurchaseOrders = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("purchase_orders")
      .select("*")
      .order("date", { ascending: true });

    if (error) throw error;

    return {
      status: 200,
      message: "Registros obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registros",
      error,
    };
  }
};

export const getPurchaseOrder = async (orderId) => {
  try {
    const { data, error } = await supabaseClient
      .from("purchase_orders")
      .select("*")
      .eq("id", orderId)
      .single(); // Espera un único resultado

    if (error) throw error;

    return {
      status: 200,
      message: "Orden obtenida con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener la orden",
      error,
    };
  }
};

export const getPurchaseOrdersItems = async (orderId) => {
  try {
    const { data, error } = await supabaseClient
      .from("purchase_orders_items")
      .select("*, products: product_id(*)")
      .eq("purchase_order_id", orderId);
    if (error) throw error;

    return {
      status: 200,
      message: "Registros obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registros",
      error,
    };
  }
};

//Función sin RPC, no la utilizo (no previene las race conditions)
export const createPurchaseOrder = async (cart) => {
  //Verifica el stock disponible

  const updatedCart = [];
  try {
    for (const item of cart) {
      const { data: product, error: productError } = await supabaseClient
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      if (productError) throw productError;

      if (product.stock < item.quantity) {
        return {
          status: 400,
          message: `Sin stock para el producto ${item.description}`,
        };
      }

      updatedCart.push({ ...item, currentStock: product.stock });
    }

    // Crear la orden de compra
    const date = new Date();
    const { data: order, error: orderError } = await supabaseClient
      .from("purchase_orders")
      .insert({ date })
      .select()
      .single();

    if (orderError) throw orderError;

    // Crea los ítems de la orden
    const orderItems = cart.map((item) => ({
      purchase_order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabaseClient
      .from("purchase_orders_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    //Actualiza el inventario
    for (const item of updatedCart) {
      const { error: stockError } = await supabaseClient
        .from("products")
        .update({ stock: item.currentStock - item.quantity })
        .eq("id", item.id);
      if (stockError) throw stockError;
    }

    return {
      status: 200,
      message: "Orden creada con éxito",
      order_id: order.id,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al crear la orden",
      error,
    };
  }
};

export const createPurchaseOrderRPC = async (cart, buyer, totalPrice) => {
  try {
    const { data, error } = await supabaseClient.rpc(
      "create_purchase_order_atomic",
      {
        items: cart,
        buyer_name: buyer.buyer_name,
        buyer_last_name: buyer.buyer_last_name,
        buyer_address: buyer.buyer_address,
        buyer_phone_number: buyer.buyer_phone_number,
        buyer_email: buyer.buyer_email,
        total_price: totalPrice,
      }
    );

    if (error) throw error;

    return {
      status: 200,
      message: "Orden creada con éxito",
      data: {
        order_id: data[0].order_id,
        cart,
        buyer,
        totalPrice,
      },
    };
  } catch (error) {
    throw new Error(
      error?.message || "Error al crear la orden desde el backend"
    );
  }
};
