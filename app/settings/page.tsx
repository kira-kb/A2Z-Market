"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@clerk/nextjs";

const AccountSettingsPage = () => {
  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    // smsNotifications: false,
  });

  // Language Preference State
  const [language, setLanguage] = useState("en");

  const handleNotificationsChange = (
    name: string,
    checked: string | boolean
  ) => {
    // const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        {/* <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Full Name"
                name="name"
                value={profileInfo.name}
                onChange={handleProfileChange}
              />
              <Input
                placeholder="Email"
                name="email"
                value={profileInfo.email}
                onChange={handleProfileChange}
              />
              <Input
                placeholder="Phone Number"
                name="phone"
                value={profileInfo.phone}
                onChange={handleProfileChange}
              />
            </div>
            <Button className="mt-4" onClick={handleProfileUpdate}>
              Update Profile
            </Button>
          </CardContent>
        </Card> */}

        {/* Change Password */}
        {/* <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <div className="flex flex-col gap-4">
              <Input
                type="password"
                placeholder="Current Password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
              <Input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <Button className="mt-4" onClick={handlePasswordUpdate}>
              Update Password
            </Button>
          </CardContent>
        </Card> */}

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              Click the profile button to manage your account
            </h2>
            <UserButton />
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              Notification Preferences
            </h2>
            <div className="flex items-center gap-4">
              <Checkbox
                id="emailNotifications"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) =>
                  handleNotificationsChange("emailNotifications", checked)
                }
                // onCheckedChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //   handleNotificationsChange(e)
                // }
                // onChange={handleNotificationsChange}
                // onChange={(e) => handleNotificationsChange(e)}
                // onChange={handleNotificationsChange}
              />
              <label htmlFor="emailNotifications">Email Notifications</label>
            </div>
          </CardContent>
        </Card>

        {/* Language Preferences */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Language Settings</h2>
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="et">Amharic</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
