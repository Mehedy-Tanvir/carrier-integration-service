# Carrier Integration Service

A TypeScript service for integrating shipping carriers, starting with UPS, to fetch real-time shipping rates. Designed with an extensible architecture to support additional carriers (FedEx, DHL, USPS) and future operations like label purchase, tracking, and address validation.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Domain Models](#domain-models)
- [Validation](#validation)
- [Authentication](#authentication)
- [Carrier Integration](#carrier-integration)
- [Service Layer](#service-layer)
- [Error Handling](#error-handling)
- [Configuration](#configuration)
- [Testing](#testing)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)

---

## Overview

This service allows clients to request shipping rates from carriers in a normalized format. It handles authentication, request mapping, response parsing, validation, and structured error handling. The current implementation includes UPS integration, with a clear pattern to add additional carriers.

---

## Architecture

The service uses a layered architecture with the **Adapter Pattern** for extensibility:

1. **Domain Layer** – internal models: `Address`, `Package`, `RateRequest`, `RateQuote`.
2. **Validation Layer** – Zod schemas to validate incoming requests.
3. **Service Layer** – orchestrates carriers; exposes `RateService`.
4. **Carrier Layer** – implements carrier-specific logic (`CarrierInterface`, `UpsCarrier`).
5. **Auth Layer** – manages OAuth token lifecycle (`UpsAuthService`).
6. **Infrastructure Layer** – utilities for HTTP, configuration, and logging (`HttpClient`, `ConfigLoader`).
7. **Error Layer** – structured error handling (`BaseError`, `CarrierError`, `AuthError`, `ValidationError`).

**Data Flow:**

1. Client sends a `RateRequest`.
2. Request is validated using Zod schemas.
3. `RateService` selects the carrier implementation.
4. Carrier maps internal model to carrier API format.
5. AuthService provides an OAuth token.
6. `HttpClient` sends the request to the carrier API.
7. Response is parsed and normalized to `RateQuote`.
8. Normalized response returned to client.

---

## Domain Models

- **Address**: street, city, state, postalCode, country.
- **Package**: weight, length, width, height.
- **RateRequest**: origin, destination, package, optional serviceLevel.
- **RateQuote**: carrier, service, price, currency, estimatedDays.

---

## Validation

All requests are validated at runtime using Zod schemas:

- `AddressSchema`
- `PackageSchema`
- `RateRequestSchema`

Validation ensures that required fields are present and values are in the correct range (e.g., positive weight and dimensions).

---

## Authentication

Uses **OAuth 2.0 Client Credentials** for UPS:

- Token cached in memory with expiry timestamp.
- Automatically refreshes expired tokens.
- Transparent to service consumers.

---

## Carrier Integration

**Carrier Interface** defines:

```ts
interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}
```
