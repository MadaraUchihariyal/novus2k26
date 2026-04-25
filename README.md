# novus2k26
App for  people that need  help during disaster ...


# 🌐 Disaster Relief Coordination Web App

**Technology for Social Good | Real-Time Crisis Coordination System**

## 📌 Overview

This web application is designed to bridge the critical coordination gap during disasters by connecting **people in need** with **volunteers and relief workers** in real time.

In disaster-prone regions like India, the issue is often not a lack of resources—but a lack of **efficient communication and coordination**. This platform acts as a **digital coordination layer**, enabling faster response, better prioritization, and structured relief efforts.

---

## 🚀 Key Features

### 🏠 Home Page

* Displays **Application Name** and a **one-line description** clearly on load
* Two main navigation options:

  * **Request Help**
  * **Volunteer Dashboard**

---

### 🆘 Request Help Form

A simple and fast interface for affected individuals to submit requests.

**Form Fields:**

* **Name Input Field**

  * Includes **"Stay Anonymous" checkbox**
  * If checked → Name displayed as *"Anonymous"* on dashboard
* **Location Input**

  * Free text (e.g., *"Near Central School"*)
* **Help Type Dropdown**

  * Food
  * Medical
  * Rescue
  * Shelter
* **Urgency Selector**

  * Low
  * Medium
  * High
* **Submit Button**

**Functionality:**

* Form validation prevents empty submissions
* Confirmation message shown after successful submission
* Designed for **quick and accessible reporting during emergencies**

---

### 👥 Volunteer Dashboard

A centralized interface for volunteers to view and act on requests.

**Request Cards Display:**
Each request appears as an individual card showing:

* Name (or *Anonymous*)
* Location
* Help Type
* Urgency Level
* Current Status

**Action Buttons:**

* ✅ **Accept**

  * Changes status from *Pending → Accepted*
* ✔️ **Mark Completed**

  * Changes status from *Accepted → Completed*

---

### 🔄 Status Tracking System

* Every new request starts as: **Pending**
* Lifecycle flow:

  ```
  Pending → Accepted → Completed
  ```
* Status updates:

  * Occur **instantly**
  * No page reload required
* Status is always clearly visible on each card

---

## 🎯 User Roles

### 📍 People in Need

* Quickly submit help requests
* Provide location and urgency details
* Option to remain anonymous

### 🤝 Volunteers & Relief Workers

* View all incoming requests in real time
* Prioritize based on urgency
* Accept and complete tasks efficiently

---

## 🧠 Problem Solved

* Eliminates **coordination gaps** in disaster response
* Enables **real-time communication** between affected individuals and responders
* Provides a **structured system for triage and action**

---

## 🛠️ Tech Stack (Customize as per your project)

* Frontend: HTML, CSS, JavaScript / React
* Backend: Node.js / Firebase / etc.
* Database: MongoDB / Firestore / etc.


