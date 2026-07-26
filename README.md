# Queue Management System

A modern **Queue Management System (QMS)** built using **HTML5, CSS3, JavaScript (ES6), and AngularJS**. The application helps manage customer queues efficiently by following the **FIFO (First In, First Out)** principle. It provides an interactive and responsive interface for generating tokens, managing the waiting queue, and serving customers in order.

---

## 📌 Project Overview

The Queue Management System is a frontend-based Single Page Application (SPA) designed to streamline customer queue management in places such as:

* 🏦 Banks
* 🏥 Hospitals & Clinics
* 🏛️ Government Offices
* 🎓 Colleges & Universities
* 🍽️ Restaurants
* 🛍️ Retail Stores
* 💼 Customer Service Centres

The system allows users to generate queue tokens, display the waiting queue, call the next customer, and monitor queue statistics—all without requiring a backend server.

---

## ✨ Features

* Generate unique queue tokens
* Add customers to the waiting queue
* Display the live queue
* Call the next customer (FIFO)
* Show the currently serving customer
* Display queue statistics

  * Total Waiting Customers
  * Total Customers Served
* Reset the queue
* Responsive and user-friendly interface
* Dynamic UI updates using AngularJS
* Optional Local Storage support for data persistence

---

## 🛠️ Technologies Used

| Technology       | Purpose                         |
| ---------------- | ------------------------------- |
| HTML5            | Application Structure           |
| CSS3             | Styling & Responsive Design     |
| JavaScript (ES6) | Queue Logic                     |
| AngularJS        | MVC Architecture & Data Binding |

---

## 📂 Project Structure

```text
Queue-Management-System/
│
├── index.html          # Main HTML page
├── style.css           # Application styling
├── app.js              # AngularJS application
├── controller.js       # Queue controller and logic
├── README.md           # Project documentation
└── assets/
    ├── images/
    └── icons/
```

---

## ⚙️ How It Works

1. Enter the customer's name.
2. Click **Generate Token**.
3. The system assigns a unique token number.
4. The customer is added to the end of the queue.
5. Clicking **Call Next** serves the first customer in the queue.
6. Queue statistics update automatically.

The application follows the **FIFO (First In, First Out)** principle, ensuring customers are served in the order they arrive.

---

## 🚀 Getting Started

### Prerequisites

* Any modern web browser
* Internet connection (for AngularJS CDN)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/Queue-Management-System.git
```

2. Navigate to the project folder:

```bash
cd Queue-Management-System
```

3. Open `index.html` in your browser.

No additional installation or server setup is required.

---

## 📖 Queue Operations

### Enqueue

Adds a new customer to the end of the queue.

### Dequeue

Removes the customer from the front of the queue.

---

## 💡 Future Enhancements

* Multiple service counters
* Priority Queue (Senior Citizens, Emergency, VIP)
* Estimated waiting time
* QR Code token generation
* Search customer by token
* Queue history
* Reports and analytics dashboard
* Backend integration with a database
* SMS or Email notifications

---

## 🎯 Learning Outcomes

This project demonstrates:

* Queue Data Structure
* FIFO Algorithm
* AngularJS MVC Architecture
* Two-Way Data Binding
* DOM Manipulation
* Responsive Web Design
* JavaScript Event Handling

---

## 📸 Screenshots

Add screenshots of your application here.

```text
assets/screenshots/home.png
assets/screenshots/queue.png
```

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## 👨‍💻 Author

**Vidhan Tripathi**

B.Tech Computer Science & Engineering
Parul Institute of Engineering & Technology

---

## 📄 License

This project is developed for educational and learning purposes.

Feel free to use, modify, and enhance it for personal or academic projects.

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub. Your support is appreciated!

---

**Built with ❤️ using HTML, CSS, JavaScript & AngularJS**
