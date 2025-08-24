"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { GetRequest } from "@/utils/GetRequest";
import { PostRequest } from "@/utils/PostRequest";
import { PutRequest } from "@/utils/PutRequest";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Save, User, Shield } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProtectedRoute from "../components/protected-route";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 0,
    name: '',
    email: '',
    phone: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await GetRequest('/user', true);

        if (!response || !response.user) {
          throw new Error('User data not found in response');
        }

        setUserProfile({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          phone: response.user.phone
        });
      } catch (error) {
        console.error("Error loading user data:", error);
        setMessage({
          type: 'error',
          text: 'Could not load your profile information. Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await PutRequest('/profile', true, {
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone
      });

      if (!response || !response.user) {
        throw new Error('Invalid response from server');
      }

      setMessage({
        type: 'success',
        text: 'Your profile has been updated successfully!'
      });

      setUserProfile({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        phone: response.user.phone
      });
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({
        type: 'error',
        text: 'Failed to update profile. Please check your information and try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Your passwords do not match' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const response = await PostRequest('/change-password', true, {
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
        confirm_password: passwordForm.confirmPassword
      });

      if (!response || !response.message) {
        throw new Error('Invalid response from server');
      }

      setMessage({
        type: 'success',
        text: 'Password changed successfully!'
      });

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error("Password change error:", error);
      setMessage({
        type: 'error',
        text: 'Failed to change password. Please check your current password and try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin h-8 w-8" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your account preferences
            </p>
          </div>

          {message && (
            <Alert className={`mb-6 ${message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'}`}
            >
              <AlertDescription>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-3 space-y-6">
              {activeTab === 'profile' && (
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <User className="h-5 w-5 mr-2" />
                      Profile Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          placeholder="Enter your email"
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                          placeholder="Enter your phone number"
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleProfileUpdate} disabled={saving}>
                        {saving ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Shield className="h-5 w-5 mr-2" />
                      Security Settings
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Change your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          placeholder="Enter current password"
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          placeholder="Enter new password"
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                          className="dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handlePasswordUpdate} disabled={saving}>
                        {saving ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>

  );
}