import Link from "next/link";
import { Filter, Plus } from "lucide-react";
import { PageHeader } from "@/components/molecules/PageHeader";
import { CourseCard } from "@/components/organisms/CourseCard";
import { Button } from "@/components/atoms/Button";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/molecules/Tabs";
import { courses } from "@/lib/mock";

export default function CoursesPage() {
  const active = courses.filter((c) => c.status === "active");
  const drafts = courses.filter((c) => c.status === "draft");
  const archived = courses.filter((c) => c.status === "archived");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description="Plan, organise, and run every class you teach."
        actions={
          <Link href="/courses/new">
            <Button leftIcon={<Plus className="h-4 w-4" />}>New course</Button>
          </Link>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar placeholder="Search courses by title or code…" />
        <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
          Filter
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({drafts.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archived.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {active.map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="drafts">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {archived.map((c) => (
              <CourseCard key={c.id} {...c} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
