import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, ChevronDown, Stethoscope } from "lucide-react";
import { getTherapistNotes, ApiError } from "@/api";
import type { TherapistNotesResponse } from "@/api/types";

interface TherapistNotesProps {
  interpretationId: string;
}

const TherapistNotes = ({ interpretationId }: TherapistNotesProps) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<TherapistNotesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const handleToggle = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (isOpen && !fetched) {
        setFetched(true);
        setLoading(true);
        setError(null);
        getTherapistNotes(interpretationId)
          .then(setNotes)
          .catch((err) => {
            setError(
              err instanceof ApiError && err.status === 404
                ? "暂无该解读的疗愈师方案"
                : "加载疗愈师方案失败，请稍后重试",
            );
          })
          .finally(() => setLoading(false));
      }
    },
    [interpretationId, fetched],
  );

  return (
    <Collapsible open={open} onOpenChange={handleToggle}>
      <Card>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors rounded-t-lg">
            <span className="flex items-center gap-2 font-semibold">
              <Stethoscope className="h-5 w-5 text-primary" />
              疗愈师参考
            </span>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            )}

            {error && <p className="text-muted-foreground text-sm text-center py-4">{error}</p>}

            {notes && (
              <>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{notes.program_name}</h3>
                  <p className="text-sm text-muted-foreground">{notes.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-md border p-4 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">画作关注点</p>
                    <p className="text-sm">{notes.painting_focus}</p>
                  </div>
                  <div className="rounded-md border p-4 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">核心干预</p>
                    <p className="text-sm">{notes.core_intervention}</p>
                  </div>
                </div>

                {notes.phases.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">疗愈阶段</h4>
                    <Accordion type="multiple" className="w-full">
                      {notes.phases.map((phase, i) => (
                        <AccordionItem key={i} value={`phase-${i}`}>
                          <AccordionTrigger>
                            {phase.name}
                            {phase.duration && (
                              <span className="ml-2 text-xs text-muted-foreground font-normal">
                                ({phase.duration})
                              </span>
                            )}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3">
                            {phase.goal && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">目标</p>
                                <p className="text-sm">{phase.goal}</p>
                              </div>
                            )}
                            {phase.therapist_tasks.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">疗愈师任务</p>
                                <ul className="list-disc list-inside text-sm space-y-0.5">
                                  {phase.therapist_tasks.map((t, j) => <li key={j}>{t}</li>)}
                                </ul>
                              </div>
                            )}
                            {phase.key_points.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">关键要点</p>
                                <ul className="list-disc list-inside text-sm space-y-0.5">
                                  {phase.key_points.map((k, j) => <li key={j}>{k}</li>)}
                                </ul>
                              </div>
                            )}
                            {phase.dialogue_examples.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">话术示例</p>
                                <div className="space-y-2">
                                  {phase.dialogue_examples.map((d, j) => (
                                    <div key={j} className="rounded-md border p-3 text-sm space-y-1">
                                      {d.场景 && (
                                        <p>
                                          <span className="font-medium text-muted-foreground">场景：</span>
                                          {d.场景}
                                        </p>
                                      )}
                                      {d.话术 && (
                                        <p>
                                          <span className="font-medium text-muted-foreground">话术：</span>
                                          {d.话术}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  {notes.observation_checklist.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">观察清单</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                        {notes.observation_checklist.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {notes.contraindications.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">禁忌事项</h4>
                      <ul className="list-disc list-inside text-sm text-destructive space-y-0.5">
                        {notes.contraindications.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default TherapistNotes;
