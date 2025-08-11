import React from 'react';
import { User, LogIn, LogOut, Menu, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { websocketService } from '../utils/websocketService';

interface HeaderProps {
  onLoginClick: () => void;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onMenuClick }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const isConnected = websocketService.isConnected();
  const connectionState = websocketService.getConnectionState();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            Ask the Government
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {/* Connection Status Indicator */}
          {isAuthenticated && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
              {isConnected ? (
                <Wifi size={16} className="text-green-600" />
              ) : (
                <WifiOff size={16} className="text-red-600" />
              )}
              <span className="text-xs text-gray-600 hidden sm:inline">
                {isConnected ? 'Live' : connectionState}
              </span>
            </div>
          )}

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};