import { toast } from "react-toastify";


// Function to check token validity
export const tokenValidity = async (refreshToken: Function, router:any) => {

    const cookie = document.cookie;
    const token = cookie
        .split("; ")
        .find((item) => item.startsWith("e_accessToken="))
        ?.split("=")[1];

    if (!token) {
        console.error("No access token found.");
        router.push('/admin')
        return;
    }else{
        router.push('/admin/dashboard')
    }

    try {
        const nowDate = Math.floor(Date.now() / 1000); // Current time in seconds
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const tokenExpiry = decodedToken.exp; 

        if (nowDate > tokenExpiry - 60) {
            // Token is expired, refresh it
            const response = await refreshToken({}).unwrap();
            console.log( "just refreshed a token", response );
            if (response.success) {
                toast.success("Access token refreshed successfully!");
                console.log("just took a shit in refresh token ")
                router.push('/admin/dashboard')
            } else {
                throw new Error("Failed to refresh the access token.");
            }
        } else {
            console.log("Token is still valid.");
        }
    } catch (error) {
        console.error("Error checking or refreshing token:", error);
        toast.error("Failed to verify or refresh token.");
    }
};
