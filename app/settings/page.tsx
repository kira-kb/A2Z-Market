"use client";

import { useEffect, useState } from "react";
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
import { UserButton, useUser } from "@clerk/nextjs";
import { useSubscriptionStore } from "@/store";
import { LoadingButton } from "@/components/loaddingButton";

const AccountSettingsPage = () => {
  const { subscriber, getSubscriber, isLoading, updateSubscriber } =
    useSubscriptionStore();

  const user = useUser();
  const userEmail = user.user?.emailAddresses[0].emailAddress;

  // const { email, notification } = getSubscriber(userEmail || "");
  const [notifications, setNotifications] = useState<boolean>(true);

  const [buttonVisibility, setButtonVisibility] = useState(false);

  const [language, setLanguage] = useState("en");
  // Language Preference State

  // console.log("user: ", user);
  // console.log("user email: ", userEmail);

  useEffect(() => {
    console.log("use effect");
    if (!userEmail) return;
    const load = async () => {
      await getSubscriber(userEmail);
    };
    load();
  }, [userEmail, getSubscriber]);

  useEffect(() => {
    if (userEmail) {
      getSubscriber(userEmail);
    }
  }, [userEmail, getSubscriber]);

  useEffect(() => {
    if (subscriber?.notification !== undefined) {
      setNotifications(subscriber.notification);
    }
  }, [subscriber.notification]);

  useEffect(() => {
    if (notifications !== subscriber.notification) {
      setButtonVisibility(true);
    } else setButtonVisibility(false);
  }, [notifications, subscriber.notification]);

  // const handleNotificationsChange = (checked: boolean) => {
  //   if (checked != notifications) setButtonVisibility(true);
  //   else setButtonVisibility(false);
  // };

  // console.log("subscriber: ", subscriber.notification);
  // console.log("notification: ", notifications);
  // console.log("buttonVisibility: ", buttonVisibility);

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
                checked={notifications}
                onCheckedChange={(checked: boolean) => {
                  // handleNotificationsChange(checked);
                  setNotifications(checked);
                  if (checked != notifications) setButtonVisibility(true);
                  else setButtonVisibility(false);
                }}

                // onCheckedChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                //   handleNotificationsChange(e)
                // }
                // onChange={handleNotificationsChange}
                // onChange={(e) => handleNotificationsChange(e)}
                // onChange={handleNotificationsChange}
              />
              <label htmlFor="emailNotifications">Email Notifications</label>
              {buttonVisibility && (
                <LoadingButton
                  loading={isLoading}
                  LoadingText="Updating..."
                  onClick={() =>
                    updateSubscriber(userEmail || "", notifications)
                  }
                >
                  Update
                </LoadingButton>
              )}
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
