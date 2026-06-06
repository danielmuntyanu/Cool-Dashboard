
export default function addSession() {
    const token = crypto.randomUUID();
    localStorage.setItem("auth-token", token);
    
    const sessionsRaw = localStorage.getItem("sessions");
    const sessionsData = JSON.parse(sessionsRaw || "[]");

    sessionsData.push(token);
    localStorage.setItem("sessions", JSON.stringify(sessionsData));
}
