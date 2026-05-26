const API_BASE_URL = "http://127.0.0.1:8000/api";

export function getToken() {
  return localStorage.getItem("gojek_token");
}

export function saveAuthData(data) {
  if (data.token) {
    localStorage.setItem("gojek_token", data.token);
  }

  if (data.user) {
    localStorage.setItem("gojek_user", JSON.stringify(data.user));
    localStorage.setItem("gojek_role", data.user.role || "");
  }

  if (data.driver) {
    localStorage.setItem("gojek_driver", JSON.stringify(data.driver));
  }

  // Sengaja tidak menyimpan next_route ke localStorage
  // supaya login tidak nyangkut ke /bank-detail, /upload-ktp, dll.
}

export function clearAuthData() {
  localStorage.removeItem("gojek_token");
  localStorage.removeItem("gojek_user");
  localStorage.removeItem("gojek_role");
  localStorage.removeItem("gojek_driver");
  localStorage.removeItem("gojek_next_route");
}

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ||
      data.errors?.email?.[0] ||
      data.errors?.password?.[0] ||
      data.errors?.name?.[0] ||
      data.errors?.phone?.[0] ||
      data.errors?.otp_code?.[0] ||
      data.errors?.bank_name?.[0] ||
      data.errors?.bank_account_name?.[0] ||
      data.errors?.bank_account_number?.[0] ||
      "Terjadi kesalahan pada server.";

    throw new Error(message);
  }

  return data;
}