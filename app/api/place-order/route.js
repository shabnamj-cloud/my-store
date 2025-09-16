import dbConnect from "@/lib/mongodb";
import Order from "../../models/Order";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { products, shippingInfo, paymentMethod, totalAmount } = await req.json();

    await dbConnect();

    // ساخت PaymentIntent در Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // به سنت
      currency: "usd",
    });

    // ذخیره سفارش در MongoDB
    const order = await Order.create({
      products,
      shippingInfo,
      paymentMethod,
      totalAmount,
      paymentStatus: "pending",
    });

    return new Response(JSON.stringify({ success: true, orderId: order._id, clientSecret: paymentIntent.client_secret }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
}
