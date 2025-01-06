export const updateCsrfToken = () => {
    const match = document.cookie.match(/csrftoken=([\w-]+)/);
    if (match) {
        console.log("Ny CSRF-token efter inloggning:", match[1]);
        return match[1];
    }
    console.error("Ingen CSRF-token hittades i cookies.");
    return null;
};