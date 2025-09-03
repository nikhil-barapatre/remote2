
"use client";

import React, { Component } from "react";

interface RemotePageState {
  userEmail: string;
}

export default class RemotePage extends Component<Record<string, never>, RemotePageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      userEmail: ''
    };
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    // Get user info from token
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
    
    if (tokenCookie) {
      try {
        const token = tokenCookie.split('=')[1];
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          this.setState({ userEmail: payload.email || 'Unknown User' });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  handleLogout = () => {
    // Clear token
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax';
    document.cookie = 'auth_token_expiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax';
    
    // Redirect to login
    window.location.href = '/container/login';
  };

  handleNavigateToDashboard = () => {
    window.location.href = '/dashboard';
  };

  render() {
    const { userEmail } = this.state;

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-purple-600">Remote App 2</h1>
              <div className="flex gap-4">
                <button
                  onClick={this.handleNavigateToDashboard}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={this.handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
            <h2 className="text-xl text-gray-700 mb-4">Welcome to Remote App 2</h2>
            {userEmail && (
              <p className="text-gray-600">Logged in as: <span className="font-semibold">{userEmail}</span></p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Feature A</h3>
              <p className="text-gray-600">This is a feature from Remote App 2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Feature B</h3>
              <p className="text-gray-600">Another feature from Remote App 2</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
