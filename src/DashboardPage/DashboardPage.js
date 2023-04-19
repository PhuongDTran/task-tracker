import React from 'react';
import './DashboardPage.css';

function DashboardPage() {
  return (
    <div>
      <body>
        <div class="topnav">
          <a class="active" href="#index">Task Tracker</a>
          <a class="inactive" href="/">Sign Out</a>
          <a class="inactive" href="#userName">User Name</a>
        </div>
      </body>
    </div>
  );
};

export default DashboardPage;