## 📌 Project Setup Instructions  

### **1️⃣ Backend Setup**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Create a `.env` file inside the **backend** directory and add:  
   ```ini
   ADMIN_KEY_HASH=<Will be generated>
   JWT_SECRET=<your_random_secret_key>
   ```
   - Replace `<your_random_secret_key>` with a **strong** secret key.  
   - The `ADMIN_KEY_HASH` will be generated in the next step.

4. **Generate the Admin Key Hash** (automatically adds it to `.env`):  
   ```sh
   node ./scripts/generateAdminHash.js
   ```
   - This script **hashes** an admin key and stores it securely in `.env`.  

5. Start the backend server:  
   ```sh
   npm run dev
   ```

---

### **2️⃣ Frontend Setup**  
1. Navigate to the frontend directory:  
   ```sh
   cd frontend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the frontend:  
   ```sh
   npm start
   ```

---

## 🔧 **Component Architecture Overview**
### **Backend (Express.js)**
#### 🔐 Authentication

- `POST [/api/auth/login](https://blacksof-assignment-vt1u.onrender.com/api/auth/login)`  
  → Admin login. Verifies the hashed admin key and returns a **JWT token**.  
  **Request Body:**
  ```json
  {
    "adminKey": "Abracadabra"
  }
  ```
  **Response:**
  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

---

#### 📬 Contact Form

- `POST [/api/contacts](https://blacksof-assignment-vt1u.onrender.com/api/contacts)`  
  → Submit a contact form.

---

#### 📂 Admin - Contact Management  
> These endpoints require a **Bearer Token** (JWT) in the `Authorization` header.

- `GET [/api/admin/contacts](https://blacksof-assignment-vt1u.onrender.com/api/admin/contacts)`  
  → Fetch all contact form submissions.  
  **Headers:**
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

- `DELETE [/api/admin/contacts/:id](https://blacksof-assignment-vt1u.onrender.com/api/admin/contacts/:id)`  
  → Delete a specific form submission by ID.  
  **Headers:**
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```


📌 **Key Middleware:**
- `auth.middleware.js` → Protects admin routes by verifying JWT.  

📌 **Services:**
- `form.service.js` → Handles MongoDB operations for contact submissions.  

---

### **Frontend (React)**
📌 **Key Components:**
- `LoginPage.jsx` → Admin login form.  
- `FormComponent.jsx` → User form for submissions.  
- `AdminDashboard.jsx` → Dashboard for viewing/deleting submissions.  

📌 **Routing (React Router)**
- `/` → HomePage.  
- `api/login` → Admin login.  
- `api/admin/contacts` → Admin panel (protected).  

📌 **State Management:**
- **Local State** (`useState`) is used for form inputs & error messages.  

---

## 📱 **Responsive Design Strategy**
- 📐 Uses **Tailwind CSS** for flexible layouts.  
- 📱 **Mobile-first** approach.  
- 📏 **Fluid typography & spacing** to ensure consistency across devices.  

---

## ⚡ **Performance Optimizations**
- ✅ **Lazy loading** for admin panel components.  
- ✅ **Minimized API calls** with React state management.  
- ✅ **Efficient form handling** to prevent unnecessary re-renders.  

---

## **📌 Testing Strategy**  

### **✅ Integration Tests (Supertest + Jest)**  
📌 **Authentication Tests**  
- Validates admin login with correct credentials  
- Ensures JWT token is returned  
- Prevents unauthorized access  

📌 **Form Submission Tests**  
- Ensures validation for invalid form submissions  
- Successfully stores valid contact forms  

📌 **Admin Routes Tests**  
- Ensures only authenticated admins can access forms  
- Validates deletion of submissions  

### **🛠 Running Tests**  
```sh
npm test
```  

---

## 🔐 **Security Measures Taken**
- **🔑 Admin Authentication** → Uses **bcrypt** for secure password hashing.  
- **🔐 JWT-Based Authentication** → Protects admin routes with a token.  
- **❌ Preventing Unauthorized Access** → Uses middleware to verify JWT.  
- **🛡️ CORS Policy** → Protects from unauthorized cross-origin requests.  
- **⚠️ Input Validation** → Ensures valid data submission.  

---

## ⚠️ **Assumptions and Challenges Faced**
### **Assumptions**
- Admin authentication uses an **admin key** (not a username/password).  
- The API is hosted on `http://localhost:8082`.  

### **Challenges**
- **JWT Expiration Handling**: Ensuring the admin session expires securely.  
- **Error Handling**: Making sure errors are user-friendly.  
- **Accessibility (WCAG & ARIA)**: Ensuring the app is **keyboard & screen-reader** friendly.  

---

## 📝 **Final Notes**
- The **Admin Key Hash** is auto-generated using:  
  ```sh
  node ./scripts/generateAdminHash.js
  ```
- Ensure `.env` is configured correctly before running the backend.  
- The app follows **best security & performance practices**.  





