export default function getSessions () {
    const sessionsRaw = localStorage.getItem("sessions");
    const sessionsData = JSON.parse(sessionsRaw || "[]");

    return sessionsData;
}