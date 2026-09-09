# Native Elaneeru Business

Standalone B2B wholesale ordering PWA for **Native Elaneeru · Sri Govindadri Ventures**.

This repository is intentionally separate from the B2C customer app so frontend releases do not deploy over each other.

## B2B features
- Business mobile + PIN login
- Vendor-specific negotiated pricing
- Standard Price vs Your Price savings
- Live market benchmark from `Market_Rates`
- B2B MOQ and quantity-step validation
- COD and approved-credit checkout
- B2B targets, outstanding and available credit
- Orders, tracking and commercial invoice / receipt
- Legal and food-safety information
- Installable standalone PWA

## QA backend
The current frontend points to the stable Native Elaneeru preview Apps Script backend. Production cutover should happen only after B2B QA is green.
