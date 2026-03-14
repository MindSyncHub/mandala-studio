import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Loader2, ChevronDown, Stethoscope, ArrowUpCircle, ImagePlus } from "lucide-react";
import { getReport, getTherapistNotes, upgradeToPro, ApiError } from "@/api";
import type { ReportResponse, TherapistNotesResponse } from "@/api/types";
import { toast } from "@/hooks/use-toast";

const Report = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  // Therapist notes (lazy)
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState<TherapistNotesResponse | null>(null);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [notesFetched, setNotesFetched] = useState(false);

  const fetchReport = useCallback(
    (version?: "lite" | "pro") => {
      if (!id) return;
      setLoading(true);
      getReport(id, version)
        .then(setReport)
        .catch(() => setError("无法加载报告，请稍后重试"))
        .finally(() => setLoading(false));
    },
    [id],
  );

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleUpgrade = async () => {
    if (!id) return;
    setUpgrading(true);
    try {
      await upgradeToPro(id);
      await getReport(id, "pro").then(setReport);
      toast({ title: "已升级到 Pro 版本" });
    } catch {
      toast({ title: "升级失败", description: "请稍后重试", variant: "destructive" });
    } finally {
      setUpgrading(false);
    }
  };

  const handleNotesToggle = useCallback(
    (open: boolean) => {
      setNotesOpen(open);
      if (open && !notesFetched && id) {
        setNotesFetched(true);
        setNotesLoading(true);
        setNotesError(null);
        getTherapistNotes(id)
          .then(setNotes)
          .catch((err) => {
            if (err instanceof ApiError && err.status === 404) {
              setNotesError("暂无该解读的疗愈师方案");
            } else {
              setNotesError("加载疗愈师方案失败，请稍后重试");
            }
          })
          .finally(() => setNotesLoading(false));
      }
    },
    [id, notesFetched],
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-fade-in">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">加载报告中…</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <p className="text-destructive">{error ?? "报告不存在"}</p>
        <Button variant="outline" onClick={() => navigate("/interpret")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回上传
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Button variant="ghost" size="sm" onClick={() => navigate("/interpret")}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        返回上传
      </Button>

      {/* ── Report Card ── */}
      <Card className="card-gradient shadow-soft">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-serif text-xl">
                {report.title ?? "解读报告"}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                版本：{report.version}
                {report.can_upgrade && report.upgrade_price != null && (
                  <span className="ml-2">· 可升级至 Pro（¥{report.upgrade_price}）</span>
                )}
              </p>
            </div>
            {report.can_upgrade && (
              <Button
                size="sm"
                onClick={handleUpgrade}
                disabled={upgrading}
                className="gap-1.5 shrink-0"
              >
                {upgrading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUpCircle className="h-4 w-4" />
                )}
                升级到 Pro
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {report.error ? (
            <p className="text-destructive text-sm">{report.error}</p>
          ) : report.report ? (
            <div className="prose prose-sm max-w-none text-foreground">
              <ReactMarkdown>{report.report}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">报告生成中，请稍后刷新查看。</p>
          )}
        </CardContent>
      </Card>

      {/* ── Therapist Notes (collapsible, lazy) ── */}
      <Collapsible open={notesOpen} onOpenChange={handleNotesToggle}>
        <Card>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors rounded-t-lg">
              <span className="flex items-center gap-2 font-semibold">
                <Stethoscope className="h-5 w-5 text-primary" />
                疗愈师参考
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${notesOpen ? "rotate-180" : ""}`}
              />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0 space-y-6">
              {notesLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                </div>
              )}

              {notesError && (
                <p className="text-muted-foreground text-sm text-center py-4">{notesError}</p>
              )}

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
                            <AccordionTrigger>{phase.name}</AccordionTrigger>
                            <AccordionContent className="space-y-3">
                              {phase.goals.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">目标</p>
                                  <ul className="list-disc list-inside text-sm space-y-0.5">
                                    {phase.goals.map((g, j) => <li key={j}>{g}</li>)}
                                  </ul>
                                </div>
                              )}
                              {phase.tasks.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">任务</p>
                                  <ul className="list-disc list-inside text-sm space-y-0.5">
                                    {phase.tasks.map((t, j) => <li key={j}>{t}</li>)}
                                  </ul>
                                </div>
                              )}
                              {phase.dialogue_examples.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">话术示例</p>
                                  <ul className="list-disc list-inside text-sm space-y-0.5">
                                    {phase.dialogue_examples.map((d, j) => <li key={j}>{d}</li>)}
                                  </ul>
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
    </div>
  );
};

export default Report;
