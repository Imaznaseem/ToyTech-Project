import { updateCsrfToken } from "../utils";

// api/blogposts.js

export const fetchBlogPosts = async () => {
    const response = await fetch("/api/blogs/", {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
    }
    return response.json();
};

export const createBlogPost = async (data) => {
    const response = await fetch("/api/blogs/create/", {
        method: "POST",
        credentials: "include",
        headers: {
            "X-CSRFToken": updateCsrfToken(), // Get updated CSRF token
        },
        body: data,
    });
    if (!response.ok) {
        const text = await response.text(); // Läs rå text för felsökning
        console.error("Error details:", errorDetails); // Logga mer information
        throw new Error(`Failed to create blog post: ${errorDetails.detail || "Unknown error"}`);
    }
    return response.json();
};

export const updateBlogPost = async (id, data) => {
    const response = await fetch(`/api/blogs/${id}/`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Get updated CSRF token
        },
        body: data,
    });
    if (!response.ok) {
        throw new Error("Failed to update blog post");
    }
    return response.json();
};

export const deleteBlogPost = async (id) => {
    const response = await fetch(`/api/blogs/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": updateCsrfToken(), // Get updated CSRF token
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete blog post");
    }
};
