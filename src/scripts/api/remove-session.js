
export default function removeSession(localToken) {
    const sessionsRaw = localStorage.getItem("sessions");
    const sessionsData = JSON.parse(sessionsRaw || "[]");

    const sessionsNew = sessionsData.filter(serverToken => serverToken !== localToken);

    localStorage.setItem("sessions", JSON.stringify(sessionsNew));
}
