"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SETTINGS_CONSTANTS } from "@/text/settings";
import { deleteGroup } from "@/lib/actions/group";
import { UserGroupCard } from "./userGroupCard";
import { deleteUserGroupById } from "@/lib/actions/usergroup";
import { MyGroup } from "@/types/group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface UserGroupListProps {
  fetchUserGroups: () => void;
  adminGroups: MyGroup[];
  memberGroups: MyGroup[];
}

export const UserGroupList: React.FC<UserGroupListProps> = ({
  fetchUserGroups,
  adminGroups,
  memberGroups,
}) => {
  const { toast } = useToast();

  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"quit" | "delete" | null>(null);

  const handleConfirmAction = () => {
    if (actionType === "quit" && selectedGroupId !== null) {
      handleQuitGroup(selectedGroupId);
    } else if (actionType === "delete" && selectedGroupId !== null) {
      handleDeleteGroup(selectedGroupId);
    }
    setSelectedGroupId(null);
    setActionType(null);
  };

  const handleQuitGroup = async (userGroupId: number) => {
    try {
      await deleteUserGroupById(userGroupId);
      toast({
        description: "You have quit the group",
      });
      fetchUserGroups();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to quit the group. Please try again.",
      });
    }
  };

  const handleDeleteGroup = async (groupId: number) => {
    try {
      await deleteGroup(groupId);
      toast({
        description: "You have deleted the group",
      });
      fetchUserGroups();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the group. Please try again.",
      });
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[100px] w-full" />
    </div>
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{SETTINGS_CONSTANTS.MANAGEMENT_GROUPS}</CardTitle>
        <CardDescription>
          {SETTINGS_CONSTANTS.MANAGEMENT_GROUPS_DESCRIPTION}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="container mx-auto p-4 max-w-2xl">
          <h2 className="text-xl font-bold mb-6">
            {SETTINGS_CONSTANTS.GROUP_ADMIN}
          </h2>
          {adminGroups.length > 0 ? (
            <div className="space-y-4">
              {adminGroups.map((group, index) => (
                <UserGroupCard
                  key={index}
                  setSelectedGroupId={setSelectedGroupId}
                  setActionType={setActionType}
                  thisGroup={group}
                  cardType="delete"
                  handleConfirmAction={handleConfirmAction}
                />
              ))}
            </div>
          ) : (
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                {SETTINGS_CONSTANTS.NO_ADMIN_GROUPS}
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="container mx-auto p-4 max-w-2xl">
          <h2 className="text-xl font-bold mb-6">
            {SETTINGS_CONSTANTS.GROUP_MEMBER}
          </h2>
          {memberGroups.length > 0 ? (
            <div className="space-y-4">
              {memberGroups.map((group, index) => (
                <UserGroupCard
                  key={index}
                  setSelectedGroupId={setSelectedGroupId}
                  setActionType={setActionType}
                  thisGroup={group}
                  cardType="quit"
                  handleConfirmAction={handleConfirmAction}
                />
              ))}
            </div>
          ) : (
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                {SETTINGS_CONSTANTS.NO_MEMBER_GROUPS}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
