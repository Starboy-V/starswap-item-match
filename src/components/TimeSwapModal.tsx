
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

interface TimeSwapModalProps {
  open: boolean;
  onClose: () => void;
}

const TimeSwapModal = ({ open, onClose }: TimeSwapModalProps) => {
  const [hours, setHours] = useState("1");
  const [days, setDays] = useState("1");
  const [timeType, setTimeType] = useState("offering");
  const [swapType, setSwapType] = useState("skills");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [itemName, setItemName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let message = "";
    if (swapType === "skills") {
      message = `You are ${timeType} ${hours} hours of your time for skills/services.`;
    } else {
      message = `You are ${timeType === "offering" ? "lending" : "borrowing"} ${itemName} for ${days} days.`;
    }
    
    // Here you would typically save the data to your backend
    toast({
      title: "TimeSwap Created",
      description: message,
    });
    
    // Reset form
    setHours("1");
    setDays("1");
    setTimeType("offering");
    setSwapType("skills");
    setDescription("");
    setSkills("");
    setItemName("");
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
            <Label>What do you want to swap?</Label>
            <RadioGroup 
              value={swapType} 
              onValueChange={setSwapType} 
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="skills" id="skills" />
                <Label htmlFor="skills">Skills & Services</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="items" id="items" />
                <Label htmlFor="items">Physical Items</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="timeType">I am:</Label>
            <Select value={timeType} onValueChange={setTimeType}>
              <SelectTrigger id="timeType">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {swapType === "skills" ? (
                  <>
                    <SelectItem value="offering">Offering my time</SelectItem>
                    <SelectItem value="seeking">Looking for help</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="offering">Lending my item</SelectItem>
                    <SelectItem value="seeking">Borrowing an item</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {swapType === "skills" ? (
            <>
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
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <Label htmlFor="itemName">
                  {timeType === "offering" ? "Item I'm lending:" : "Item I'm borrowing:"}
                </Label>
                <Input
                  id="itemName"
                  placeholder="e.g., MacBook Pro, Camera, Musical Instrument"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="days">Duration (days):</Label>
                <Select value={days} onValueChange={setDays}>
                  <SelectTrigger id="days">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="7">1 week</SelectItem>
                    <SelectItem value="14">2 weeks</SelectItem>
                    <SelectItem value="30">1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              placeholder={swapType === "skills" 
                ? "Describe what you're offering or looking for..." 
                : `Describe the item and any special conditions (${timeType === "offering" ? "e.g., must be picked up in person" : "e.g., willing to provide deposit"})...`}
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
