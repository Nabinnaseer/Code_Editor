        
        const editor = document.getElementById("editor");
        const preview = document.getElementById("preview");
        const copyButton = document.getElementById("copy-button");
        const saveButton = document.getElementById("save-button");
        const lockButton = document.getElementById("lock-button");

        //Code for preview
        const updatePreview = () => {
            const htmlCode = editor.value;
            preview.innerHTML = htmlCode;
        };
        editor.addEventListener("input", updatePreview);

        // Copy Button functionality
        copyButton.addEventListener("click", () => {
            const htmlCode = editor.value;
            navigator.clipboard.writeText(htmlCode)
                .then(() => {
                    alert("HTML code copied to clipboard!");
                })
                .catch((error) => {
                    console.error("Copy failed:", error);
                });
        });

        // Lock/Unlock Button functionality
        let isLocked = false;
        lockButton.addEventListener("click", () => {
            isLocked = !isLocked;
            lockButton.innerText = isLocked ? "Unlock" : "Lock";
            editor.readOnly = isLocked;
        });

        // Save Button functionality
        saveButton.addEventListener("click", () => {
            const htmlCode = editor.value;
            const blob = new Blob([htmlCode], { type: "text/html" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "index.html"; // You can set the file name here
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });