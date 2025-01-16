# Link Manager

Link Manager is a modern web application designed to help you manage your links effectively. With features like adding, updating, deleting, and differentiating links using colors, this app ensures an intuitive and personal link management experience. The app is account-based, keeping your links private and secure. It also supports offline functionality via PWA integration, making it accessible on both desktop and mobile devices.

## Features

- **Link Management**: Add, update, delete, and organize your links efficiently.
- **Undo Functionality**: Reverse accidental deletions or updates.
- **Color Coding**: Assign colors to links for better organization.
- **Account-Based**: Create an account to manage your personal links securely.
- **Cross-Platform**: Use the app on desktop and mobile with PWA integration.
- **Animations**: Smooth animations powered by GSAP for an enhanced user experience.

## Tech Stack

- **Frontend**: Next.js (React-based framework)
- **Backend**: MySQL (managed using Prisma ORM, hosted on Aiven)
- **State Management**: Redux
- **UI Components**: ShadCN
- **Animations**: GSAP
- **PWA Integration**: For offline usage and cross-platform compatibility

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [XAMPP](https://www.apachefriends.org/index.html) (if using a local MySQL server)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/link-manager.git
   cd link-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   DATABASE_URL="mysql://username:password@host:port/database"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

   - Replace `username`, `password`, `host`, `port`, and `database` with your MySQL database details.

4. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

5. Run database migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. Access the app at [http://localhost:3000](http://localhost:3000).

---

## Using MySQL with a Local Server (XAMPP)

1. Download and install [XAMPP](https://www.apachefriends.org/index.html).

2. Start the MySQL service:

   - Open the XAMPP control panel.
   - Start the MySQL module.

3. Create a new database:

   - Access phpMyAdmin at [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
   - Click on "Databases."
   - Enter a database name (e.g., `link_manager`) and click "Create."

4. Update `.env` file:

   ```env
   DATABASE_URL="mysql://root:@localhost:3306/link_manager"
   ```

   - The default username is `root`, and the password is empty unless configured otherwise.

5. Apply Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the app as described above.

---

## PWA Integration

The app is configured as a Progressive Web App (PWA), allowing you to:

- Install it on your desktop or mobile device.
- Use it offline with limited functionality.

To install the app:

1. Open the app in a supported browser (e.g., Chrome).
2. Click the "Install" button in the address bar or the browser menu.

---

## Contribution

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For inquiries, reach out to [[rockingabhinav2000@gmail.com](mailto\:rockingabhinav2000@gmail.com)/+91 7017311270].

