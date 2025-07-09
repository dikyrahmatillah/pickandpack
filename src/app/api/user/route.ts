import { NextRequest, NextResponse } from "next/server";

type Role = "admin" | "editor" | "viewer";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: Role;
}

const MockUser: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@mail.com",
    password: "admin123",
    image: "/users/a.png",
    role: "admin",
  },
  {
    id: 2,
    name: "Editor",
    email: "editor@mail.com",
    password: "editor123",
    image: "/users/e.png",
    role: "editor",
  },
  {
    id: 3,
    name: "Viewer",
    email: "viewer@mail.com",
    password: "viewer123",
    image: "/users/v.png",
    role: "viewer",
  },
];

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (email) {
    const user = MockUser.find((user) => user.email === email);
    if (user) {
      return NextResponse.json(user);
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(MockUser);
}
