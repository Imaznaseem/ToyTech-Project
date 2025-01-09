import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "../api/blogposts";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBlogPosts = async () => {
            try {
                const data = await fetchBlogPosts();
                setBlogs(data);
            } catch (err) {
                setError(err.message);
            }
        };

        loadBlogPosts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {blogs.map((blog) => (
                <div key={blog.id} style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
                    {blog.image && (
                        <img
                            src={`http://localhost:8000${blog.image}`} // Combine backend URL and image path
                            alt={blog.title}
                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                        />
                    )}
                    <h3>{blog.title}</h3>
                    <p>{blog.content.substring(0, 100)}...</p> {/* Display first 100 characters */}
                </div>
            ))}
        </div>
    );
};

export default BlogList;