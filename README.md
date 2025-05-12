# Johanna AI – Project Overview

Johanna AI is an assistant designed to support current and aspiring **Psychology** students.  
The full solution is composed of **three independent applications** that communicate with one another:

---

## 1. Web Client

* **Repository**: <https://github.com/bispo-daniel/React_Johanna>  
* **Stack**: Vite + React 18, TypeScript, and Tailwind CSS  
* **Role**: delivers the web interface where users—either "super user" or "commom user" — sign in, chat with Johanna AI, view answers in real time, and (for "super user") approve pending registrations submitted by common users. 
* **Integrations**  
  * REST API (Java) for authentication and persistent data  
  * WebSocket for streaming model responses  

> For complete details on scripts, dependencies, and local setup, see the `package.json` in this repository.

---

## 2. WebSocket Server

* **Repository**: <https://github.com/bispo-daniel/johanna_openai>  
* **Stack**: Node.js, Express, Socket.io, and TypeScript  
* **Role**: receives messages from the front-end, forwards them to the fine-tuned OpenAI model, and streams the responses back to the client  
* **Technical highlights**  
  * Payload validation with **Zod**  
  * JWT support to identify authenticated users  
  * Sensitive variables loaded via **dotenv**

---

## 3. REST API

* **Repository**: <https://github.com/DevRodrigoSantana/Smart-teaching-assistant-Johana>  
* **Stack**: Spring Boot 3 (Java 17), Hibernate JPA, Spring Security, and MySQL  
* **Role**: business core — manages users, JWT authentication, data persistence, and domain rules  
* **Key dependencies**  
  * `spring-boot-starter-web` and `spring-boot-starter-data-jpa` for the web layer and ORM  
  * `spring-boot-starter-security` with **jjwt** for authentication  
  * **ModelMapper** for DTO ↔ entity mapping  

---

## How the layers fit together

1. The **Web Client** sends login requests and other REST operations to the **API**.  
2. Once authenticated, the browser opens a **WebSocket** channel to chat with Johanna AI.  
3. The **WebSocket Server** connects to OpenAI, receives streamed responses, and pushes them back to the front-end.  
4. User data, sessions, and history are stored by the **API** in a MySQL database.

---

For questions or contributions, visit each repository above and consult the relevant configuration files (`package.json`, `pom.xml`).
