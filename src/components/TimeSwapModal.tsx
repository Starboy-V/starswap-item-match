
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface TimeSwapModalProps {
  open: boolean;
  onClose: () => void;
}

const TimeSwapModal = ({ open, onClose }: TimeSwapModalProps) => {
  const [hours, setHours] = useState("1");
  const [timeType, setTimeType] = useState("offering");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    toast({
      title: "TimeSwap Created",
      description: `You are ${timeType} ${hours} hours of your time.`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a TimeSwap</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="timeType">I am:</Label>
            <Select value={timeType} onValueChange={setTimeType}>
              <SelectTrigger id="timeType">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="offering">Offering my time</SelectItem>
                <SelectItem value="seeking">Looking for help</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="hours">Hours:</Label>
            <Select value={hours} onValueChange={setHours}>
              <SelectTrigger id="hours">
                <SelectValue placeholder="Select hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">30 minutes</SelectItem>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="3">3 hours</SelectItem>
                <SelectItem value="4">4+ hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="skills">
              {timeType === "offering" ? "Skills I'm offering:" : "Skills I'm seeking:"}
            </Label>
            <Input
              id="skills"
              placeholder="e.g., Graphic design, coding, language tutoring"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              placeholder="Describe what you're offering or looking for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create TimeSwap</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TimeSwapModal;
