"use client";

import React, { useEffect, useState } from "react";

function SocialShare() {
    const postImagePath = "/post-image.jpg"; // Path to image in public folder
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(postImagePath);
                const blob = await response.blob();
                const file = new File([blob], "post-image.jpg", { type: blob.type });
                setImageFile(file);
            } catch (error) {
                console.error("Failed to fetch image:", error);
            }
        };

        fetchImage();
    }, []);

    const handleShare = async () => {
        if (!imageFile) {
            alert("Image is still loading. Please wait.");
            return;
        }

        if (navigator.share && navigator.canShare({ files: [imageFile] })) {
            try {
                await navigator.share({
                    files: [imageFile], // Only the image is shared
                });
            } catch (error) {
                console.error("Error sharing:", error);
                alert("Sharing failed.");
            }
        } else {
            alert("Your device does not support image sharing.");
        }
    };

    return (
        <div className="w-full h-lvh flex flex-col items-center justify-center text-center p-4">
            {imageFile && (
                <img
                    src={postImagePath}
                    alt="Post image"
                    className="w-80 h-60 object-cover my-4 rounded-md"
                />
            )}

            {/* Native Image Share Button */}
            <button
                onClick={handleShare}
                className="p-2 border border-blue-800 bg-blue-100 rounded-md my-2"
            >
                Share Image
            </button>
        </div>
    );
}

export default SocialShare;
