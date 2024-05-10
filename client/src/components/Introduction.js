import React from 'react';
import AuthNav from './auth-nav';

const Introduction = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Book Management!</h1>
        <p className="text-lg mb-6">We provide a platform for you to manage your personal library and discover new books.</p>
        <AuthNav />
      </div>
    </div>
  )

  export default Introduction;