npm install bcryptjs cors dotenv express jsonwebtoken mongoose

---

npm install react react-dom react-icons react-router-dom axios

npm install --save-dev eslint @vitejs/plugin-react vite


* ❌ Don’t store tokens in **localStorage** → vulnerable to XSS (attackers can steal it).
* ✅ Use **httpOnly cookies** → browser sends them automatically, JavaScript can’t read them, safer.

👉 Best practice: **Store JWT in secure httpOnly cookies, not in localStorage.**
