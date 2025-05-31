"use client";
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import axios from "axios"

interface Room {
  id: number;
  slug: string;
  createdAt: string;
  adminId: string;
}

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch user's rooms
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/rooms`)
        console.log(response.data.rooms)
        const data = response.data.rooms
        setRooms(data);
        if (data.length > 0) {
          setSelectedRoom(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      // Fetch messages for selected room
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/api/rooms/${selectedRoom.id}/messages`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedRoom]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedRoom) return;

    try {
      const response = await fetch(`/api/rooms/${selectedRoom.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage("");
        // Refresh messages
        const updatedMessages = await response.json();
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Room List Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Chat Rooms</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`w-full p-3 text-left rounded-lg transition-colors ${
                  selectedRoom?.id === room.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{room.slug}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created {new Date(room.createdAt).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border">
          <Button className="w-full" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Room
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold">{selectedRoom.slug}</h2>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a room to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
