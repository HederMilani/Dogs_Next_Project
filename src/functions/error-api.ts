export default function errorApi(e: unknown): {
  data: null;
  ok: false;
  error: string;
} {
  if (e instanceof Error) {
    return { data: null, ok: false, error: e.message };
  } else {
    return { data: null, ok: false, error: "Error" };
  }
}
