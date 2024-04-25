# Time Tracker

## Overview

This project provides a platform designed to streamline project management and task allocation across teams. At its core, the application facilitates efficient tracking and organization of projects and tasks, ensuring that team members have clear visibility into their responsibilities and deadlines.

## Key Features


- Access a detailed weekly/historical view of tasks at the `/home` endpoint.
- The interface includes an expandable table for in-depth information on each TimeEntry.

![TimeEntry Details](/src/tableView.png "Detailed View of Task Entries")



## Technology Stack

to make things simple, this project uses only React

## Installation

This is the Frontend Counterpart of https://github.com/vivre111/Time-Tracker-api

**please follow the instruction on the backend first as the frontend relies on it**

to run frontend on docker:

```bash
git clone https://github.com/vivre111/Time-Tracker
cd Time-Tracker
docker compose up
```

to run locally:

```bash
git clone https://github.com/vivre111/Time-Tracker
cd Time-Tracker
yarn
yarn start
```
