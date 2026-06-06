
export default function addSession(localToken) {
    const sessionsRaw = localStorage.getItem("sessions");
    const sessionsData = JSON.parse(sessionsRaw || "[]");

    sessionsData.push(localToken);

    localStorage.setItem("sessions", JSON.stringify(sessionsData));
}
