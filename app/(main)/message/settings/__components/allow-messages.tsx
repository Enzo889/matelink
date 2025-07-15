import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sprout } from "lucide-react";
import React from "react";

function AllowMessages() {
  return (
    <div className="w-full flex flex-col p-3 gap-4">
      <p className="font-bold text-xl">Allow new messages from</p>
      <RadioGroup defaultValue="follow">
        <div className="flex items-center gap-3 w-full cursor-pointer hover:bg-muted/50 rounded-md p-2">
          <Label htmlFor="r1" className="w-full cursor-pointer">
            Everyone
          </Label>
          <RadioGroupItem value="everyone" id="r1" />
        </div>
        <div className="flex items-center gap-3 w-full cursor-pointer hover:bg-muted/50 rounded-md p-2">
          <Label htmlFor="r2" className="w-full cursor-pointer">
            Users I follow
          </Label>
          <RadioGroupItem value="follow" id="r2" />
        </div>
        <div className="flex items-center gap-3 w-full cursor-pointer hover:bg-muted/50 rounded-md p-2">
          <Label htmlFor="r3" className="w-full cursor-pointer">
            No one
          </Label>
          <RadioGroupItem value="no-one" id="r3" />
        </div>
      </RadioGroup>

      <div className="flex gap-2 items-center text-pretty text-center p-3 rounded-xs bg-card">
        <Sprout className="text-primary" />
        <p>
          You can continue ongoing conversations regardless of which setting you
          choose.
        </p>
      </div>
    </div>
  );
}

export default AllowMessages;
