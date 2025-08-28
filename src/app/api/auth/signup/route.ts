import { DBconnect } from "@/lib/DBconnect";
import { UserModel } from "@/models/user.model";

export async function POST(req: Request) {
  await DBconnect();
  try {
    const { email, password, firstName, lastName } = await req.json();

    //checking if user already exists or not
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User with this email already exists",
        }),
        { status: 409 }
      );
    }
    // Create a new user
    const newUser = await UserModel.create({
      email,
      password,
      firstName,
      lastName,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
        data: newUser,
      }),

      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: `Internal Server Error : ${error}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
