# FoodApp Backend (Spring Boot)

Complete backend project with JWT auth, role-based access, and integrated APIs for:

- Authentication (register/login)
- Category management
- Food item management
- Cart management
- Order placement and status updates

## Tech Stack

- Java 17
- Spring Boot 3.3.2
- Spring Security 6 + JWT
- Spring Data JPA
- MySQL
- Maven

## API Version

All endpoints are prefixed with `/api/v1`.

## Run

1. Update DB credentials in `src/main/resources/application.yml`.
2. Start MySQL.
3. Run:

```bash
mvn spring-boot:run
```

## Default Admin

- Email: `admin@foodapp.com`
- Password: `Admin@123`

Created automatically on first run if not existing.
