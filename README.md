# Carrier Integration Service

A TypeScript-based backend service that integrates with shipping carriers (starting with UPS) to fetch shipping rates. The system is designed with extensibility in mind, allowing easy addition of new carriers like FedEx, DHL, or USPS in the future.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Carrier Integration](#carrier-integration)
- [Service Layer](#service-layer)
- [Error Handling](#error-handling)
- [Configuration](#configuration)
- [Testing](#testing)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)

---

## Overview

This project implements a **carrier integration service** that:

- Accepts a normalized rate request
- Communicates with UPS API (stubbed)
- Returns normalized shipping rate quotes
- Handles authentication using OAuth 2.0
- Provides a clean and extensible architecture

The system abstracts away carrier-specific details so that the caller never interacts with raw UPS request/response formats.

---

## Architecture

The project follows a **Layered Architecture with Adapter Pattern**.

### Layers

src/
├── config/  
├── domain/  
├── validation/  
├── errors/  
├── http/  
├── auth/  
├── carriers/  
│ └── ups/  
├── services/

### Data Flow

1. Client sends `RateRequest`
2. Request is validated
3. `RateService` processes request
4. Carrier implementation maps request to UPS format
5. Auth service provides token
6. HTTP client sends request
7. Response is parsed and normalized
8. `RateQuote[]` returned

---

## Carrier Integration

### Design

- Uses **Adapter Pattern**
- Each carrier implements a common interface

### Carrier Interface

```ts
interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}
```

### UPS Implementation

- Request Builder → Converts internal model → UPS payload
- Response Parser → Converts UPS response → `RateQuote`
- Auth Service → Handles OAuth token lifecycle

### Adding a New Carrier

1. Create a new folder under `carriers/`
2. Implement `Carrier` interface
3. Add request builder & response parser
4. Register in service layer

---

## Service Layer

### RateService

Responsible for:

- Validating input
- Calling the appropriate carrier
- Returning normalized response

```ts
getRates(request: RateRequest): Promise<RateQuote[]>
```

---

## Error Handling

Structured error system with custom classes:

- BaseError
- ValidationError
- AuthError
- CarrierError
- NetworkError

### Principles

- No raw errors exposed
- All errors are normalized
- Clear error messages and codes

---

## Configuration

All configuration is environment-based.

### .env.example

```
UPS_CLIENT_ID=your_client_id
UPS_CLIENT_SECRET=your_client_secret
UPS_BASE_URL=https://api.ups.com
UPS_AUTH_URL=https://wwwcie.ups.com/security/v1/oauth/token
HTTP_TIMEOUT=5000
```

---

## Testing

### Setup

- Jest
- ts-jest

### Strategy

Integration tests with stubbed HTTP layer

### Run Tests

```
npm test
```

---

## Getting Started

### Install Dependencies

```
npm install
```

### Setup Environment

```
cp .env.example .env
```

### Run Tests

```
npm test
```

---

## Future Improvements

- Add more carriers (FedEx, DHL, USPS)
- Add shipment tracking
- Add label generation
- Add retry and caching mechanisms

---
