"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon, PlusIcon, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  email: string;
  name: string;
  username: string;
  avatar: string;
}

function HeaderChats() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();

  // Mock users data - replace with your actual data source
  const users = [
    {
      email: "john@example.com",
      name: "John Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "jane@example.com",
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      email: "bob@example.com",
      name: "Bob Johnson",
      username: "bobjohnson",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  return (
    <div className="flex items-center p-4 w-full h-fit justify-between">
      <p className="text-xl font-semibold">Chats</p>
      <div className="flex gap-4 justify-center items-center">
        <Link
          href={"message/settings"}
          className="hover:bg-accent/40 transition-colors duration-100 p-2 rounded-full"
        >
          <Settings />
        </Link>
        <Button className="cursor-pointer" onClick={() => setOpen(true)}>
          <PlusIcon /> New chat
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pt-5 pb-4">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Select a user to start a new conversation.
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    data-active={selectedUser?.email === user.email}
                    className="data-[active=true]:opacity-50 data-[active=false]:cursor-pointer"
                    onSelect={() => {
                      setSelectedUser(
                        selectedUser?.email === user.email ? null : user
                      );
                    }}
                  >
                    <Avatar className="border">
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm leading-none font-medium">
                        {user.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {user.email}
                      </p>
                    </div>
                    {selectedUser?.email === user.email ? (
                      <CheckIcon className="text-primary ml-auto flex size-4" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 @2xl:justify-between">
            {selectedUser ? (
              <div className="flex items-center gap-2">
                <Avatar className="inline-block border">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedUser.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Select a user to start messaging.
              </p>
            )}
            <Button
              disabled={!selectedUser}
              size="sm"
              className="cursor-pointer"
              onClick={() => {
                if (selectedUser) {
                  // Navigate to the chat page with the selected user
                  router.push(`/message/${selectedUser.username}`);
                  setSelectedUser(null);
                  setOpen(false);
                }
              }}
            >
              Start Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HeaderChats;
