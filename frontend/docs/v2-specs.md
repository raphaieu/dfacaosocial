# Product Requirements Document (PRD) - V2 Specifications

This document outlines the planned features and technical specifications for the second version (V2) of the D.F. Ação Social platform.

## 1. Media Management Integration (Google Drive)
To optimize server resources and disk usage, all high-resolution media (photos/videos) should be hosted externally.

- **Objective**: Use Google Drive (or similar cloud storage) as the primary source for action galleries.
- **Implementation**:
  - Store public Google Drive folder/file IDs in the database.
  - Create a proxy service or use Direct Download links to fetch and display images/videos.
  - Implement a caching layer for thumbnails to improve performance.
- **Benefit**: Zero impact on hosting disk space and easier management for volunteers.

## 2. Mercado Pago Integration (Financial)
Automate the donation process and provide real-time financial transparency.

- **Objective**: Replace the manual "Copy PIX" process with a transparent checkout.
- **Features**:
  - Credit card, Boleto, and PIX (dynamic) support.
  - Automatic status updates via Webhooks.
  - **Transparency Dashboard**: Connect checkout success events to a public ledger showing amounts received per campaign.
- **Workflow**:
  - User chooses amount -> Redirect to Mercado Pago/Transparent Checkout -> Payment Confirmed -> Action "Financial Goal" updated automatically.

## 3. Advanced Actions Features
- **Video Support**: Embed video players (YouTube/Drive) directly in the action gallery.
- **Interactive Timeline**: Show the progress of long-term actions through a chronological timeline of updates.
- **Volunteer Check-in**: A basic system for volunteers to sign up for specific dates/actions via the portal.

## 4. UI/UX Refinements
- **Infinite Scroll**: Transition from basic pagination to a seamless infinite scroll for the Actions grid.
- **Advanced Filtering**: Filter by category (Food, Education, etc.) and date range.
- **Dark Mode**: High-contrast dark mode for better accessibility.
