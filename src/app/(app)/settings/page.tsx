import { PageHeader } from "@/components/molecules/PageHeader";
import { Card } from "@/components/molecules/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/molecules/Tabs";
import { FormField } from "@/components/molecules/FormField";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { Button } from "@/components/atoms/Button";
import { Avatar } from "@/components/atoms/Avatar";
import { Select } from "@/components/atoms/Select";
import { Divider } from "@/components/atoms/Divider";
import { Checkbox } from "@/components/atoms/Checkbox";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your profile, preferences, and workspace." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="max-w-2xl space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name="Sarah Chen" size="xl" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Upload photo</Button>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First name" htmlFor="first">
                <Input id="first" defaultValue="Sarah" />
              </FormField>
              <FormField label="Last name" htmlFor="last">
                <Input id="last" defaultValue="Chen" />
              </FormField>
            </div>
            <FormField label="Email" htmlFor="email">
              <Input id="email" type="email" defaultValue="sarah.chen@school.edu" />
            </FormField>
            <FormField label="Bio" htmlFor="bio" hint="Visible to your students.">
              <Textarea
                id="bio"
                rows={3}
                defaultValue="Mathematics instructor focused on making abstract ideas tangible."
              />
            </FormField>
            <div className="flex justify-end gap-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="max-w-2xl space-y-5">
            <FormField label="Language" htmlFor="lang">
              <Select id="lang" defaultValue="en">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </Select>
            </FormField>
            <FormField label="Time zone" htmlFor="tz">
              <Select id="tz" defaultValue="pst">
                <option value="pst">Pacific Time (PST)</option>
                <option value="est">Eastern Time (EST)</option>
                <option value="utc">UTC</option>
              </Select>
            </FormField>
            <FormField label="Theme" htmlFor="theme">
              <Select id="theme" defaultValue="system">
                <option value="system">Match system</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </Select>
            </FormField>
            <div className="flex justify-end">
              <Button>Save</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="max-w-2xl space-y-4">
            {[
              { label: "New assignment submissions", desc: "Notify me when students submit work." },
              { label: "Student messages", desc: "Email me for direct messages." },
              { label: "Weekly summary", desc: "A digest of class activity every Friday." },
              { label: "Product updates", desc: "Hear about new features and tips." },
            ].map((p) => (
              <div key={p.label} className="flex items-start gap-3 py-2">
                <Checkbox defaultChecked className="mt-1" />
                <div>
                  <p className="text-sm font-medium text-text">{p.label}</p>
                  <p className="text-xs text-text-muted">{p.desc}</p>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="max-w-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text">Current plan</p>
                <p className="text-xs text-text-muted">Free · 100 AI prompts / month</p>
              </div>
              <Button>Upgrade</Button>
            </div>
            <Divider />
            <p className="text-sm text-text-muted">
              You're on the free plan. Upgrade for unlimited AI prompts, priority grading, and
              advanced analytics.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
