import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cqaluvsaxhdiultpaqnl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxYWx1dnNheGhkaXVsdHBhcW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjEwOTYsImV4cCI6MjA1MjMzNzA5Nn0.l4AyBhhkgTl5qvKgvpovzV2VfntzHmCN6w_wIMgIYGg";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const { data: contacts, error } = await supabase
    .from("videojuego")
    .select("*")
    .order("titulo", { ascending: true });

  return new Response(JSON.stringify(contacts), { status: 200 });
}

export async function DELETE(request) {
  const body = await request.json();
  const id = body.id;

  const { data: deleteData, error } = await supabase
    .from("videojuego")
    .delete()
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify(error), { status: 404 });
  }

  return new Response(JSON.stringify({ success: "eliminado con éxito" }), {
    status: 200,
  });
}

export async function PUT(request) {
  const body = await request.json();
  const id = body.id;
  const { data: updateData, error } = await supabase
    .from("videojuego")
    .update(body.update)
    .eq("id", id);
  return new Response(
    JSON.stringify({ success: "actualizado" }, { status: 200 })
  );
}

export async function POST(request) {
  const body = await request.json();
  const juego = body.video;
  const { data: postData, error } = await supabase
    .from("videojuego")
    .insert(juego);

  if (!error) {
    return new Response(JSON.stringify({ success: "Creado con éxito" }), {
      status: 201,
    });
  }

  return new Response(JSON.stringify(error), { status: 400 });
}
