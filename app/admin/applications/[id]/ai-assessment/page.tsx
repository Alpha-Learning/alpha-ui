"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiService } from "@/app/utils";
import toast from "react-hot-toast";

interface UTLReport {
  summary?: string;
  overallReadiness?: "emerging" | "basic" | "strong" | "exceptional";
  learningStyle?: {
    primary: "visual" | "auditory" | "kinesthetic" | "reading_writing";
    secondary?: string;
    description: string;
  };
  dominantIntelligences?: Array<{
    type: string;
    strength: "high" | "moderate" | "emerging";
    evidence: string;
  }>;
  cognitiveProfile?: {
    attention: { description: string; score?: number; optimalConditions?: string; };
    memory: { description: string; strategies: string[]; };
    processing: { description: string; preference: "sequential" | "holistic" | "mixed"; };
    executiveFunction: { description: string; observations: string[]; };
  };
  metaLearningPillars?: {
    selfRegulation: { score: number; notes: string; developmentStrategy?: string; };
    emotionalIntelligence: { score: number; notes: string; developmentStrategy?: string; };
    socialCommunication: { score: number; notes: string; developmentStrategy?: string; };
    cognitiveFlexibility: { score: number; notes: string; developmentStrategy?: string; };
    resilienceConfidence: { score: number; notes: string; developmentStrategy?: string; };
    creativityExpression: { score: number; notes: string; developmentStrategy?: string; };
  };
  academicReadiness?: {
    english: { level: string; notes: string; entryPoint?: string; };
    maths: { level: string; notes: string; entryPoint?: string; };
    science: { level: string; notes: string; entryPoint?: string; };
    technologyComfort: string;
    overallNotes: string;
  };
  emotionalProfile?: {
    triggers: string[];
    regulationStrategies: string[];
    motivationFactors: string[];
    supportNeeds: string[];
  };
  socialProfile?: {
    peerDynamics: string;
    socialRole: string;
    collaborationStyle: string;
    communicationStrength: string;
  };
  observationalInsights?: {
    preferredZones: string[];
    engagementPatterns: string;
    behavioralNotes: string[];
  };
  familyContext?: {
    parentingStyle: string;
    homeEnvironment: string;
    familySupport: string;
    alignmentWithPhilosophy: string;
  };
  strengths?: string[];
  challenges?: string[];
  recommendations?: Array<{
    category: string;
    action: string;
    priority: "high" | "medium" | "low";
    rationale: string;
  }>;
  keyStageLevel?: {
    keyStage: string;
    developmentalStage: string;
    ageGroup: string;
    subjectPlacements?: {
      english: { yearLevel: string; entryTopic: string; notes: string; };
      maths: { yearLevel: string; entryTopic: string; notes: string; };
      science: { yearLevel: string; entryTopic: string; notes: string; };
    };
    teachingApproaches?: string[];
    suggestedActions?: string[];
  };
}

export default function AIAssessmentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<UTLReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAssessment();
  }, [params.id]);

  const loadAssessment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get(`/api/admin/applications/${params.id}/ai-assessment`);
      if (response.success && response.data) {
        setReport(response.data);
      } else {
        setError(response.message || "Failed to load assessment");
      }
    } catch (err: any) {
      console.error("Error loading assessment:", err);
      setError(err?.response?.data?.message || "Failed to load assessment");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getReadinessColor = (readiness?: string) => {
    switch (readiness) {
      case "exceptional": return "text-green-600 bg-green-100";
      case "strong": return "text-blue-600 bg-blue-100";
      case "basic": return "text-yellow-600 bg-yellow-100";
      case "emerging": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-300";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low": return "bg-blue-100 text-blue-700 border-blue-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStrengthColor = (strength?: string) => {
    switch (strength) {
      case "high": return "text-green-600 bg-green-100";
      case "moderate": return "text-blue-600 bg-blue-100";
      case "emerging": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading AI Assessment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
            <div className="text-center py-12">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Assessment</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={loadAssessment}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6 text-lg">No assessment data available</p>
              <button
                onClick={() => router.back()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Application
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">UTL AI Analysis Report</h1>
              {report.overallReadiness && (
                <div className="flex items-center gap-3 mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getReadinessColor(report.overallReadiness)}`}>
                    {report.overallReadiness} Readiness
                </span>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {report.summary && (
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-xl shadow-lg border border-purple-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">📊</span>
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{report.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Style */}
          {report.learningStyle && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-600">🎯</span>
                Learning Style
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold text-purple-600 capitalize mb-2">
                    {report.learningStyle.primary}
                  </div>
                  {report.learningStyle.secondary && (
                    <div className="text-sm text-gray-600">
                      Secondary: <span className="font-semibold capitalize">{report.learningStyle.secondary}</span>
                  </div>
                )}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed bg-purple-50 p-4 rounded-lg">
                  {report.learningStyle.description}
                </p>
              </div>
            </div>
          )}

          {/* Dominant Intelligences */}
          {report.dominantIntelligences && report.dominantIntelligences.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-indigo-600">🧠</span>
                Dominant Intelligences
              </h2>
                <div className="space-y-3">
                {report.dominantIntelligences.map((intelligence, idx) => (
                    <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r-lg">
                      <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-900 capitalize">
                        {intelligence.type.replace('_', ' ')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${getStrengthColor(intelligence.strength)}`}>
                        {intelligence.strength}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{intelligence.evidence}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cognitive Profile */}
        {report.cognitiveProfile && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-blue-600">🧩</span>
              Cognitive Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attention */}
              {report.cognitiveProfile.attention && (
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 mb-2">Attention</h3>
                  {report.cognitiveProfile.attention.score && (
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Score</span>
                        <span className="font-bold">{report.cognitiveProfile.attention.score}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(report.cognitiveProfile.attention.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-700 mb-2">{report.cognitiveProfile.attention.description}</p>
                  {report.cognitiveProfile.attention.optimalConditions && (
                    <p className="text-xs text-gray-600 italic">
                      <strong>Optimal:</strong> {report.cognitiveProfile.attention.optimalConditions}
                    </p>
                  )}
                </div>
              )}

              {/* Memory */}
              {report.cognitiveProfile.memory && (
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-gray-900 mb-2">Memory</h3>
                  <p className="text-sm text-gray-700 mb-3">{report.cognitiveProfile.memory.description}</p>
                  {report.cognitiveProfile.memory.strategies && report.cognitiveProfile.memory.strategies.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Strategies:</p>
                      <div className="flex flex-wrap gap-2">
                        {report.cognitiveProfile.memory.strategies.map((strategy, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            {strategy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Processing */}
              {report.cognitiveProfile.processing && (
                <div className="border border-gray-200 rounded-lg p-4 bg-purple-50">
                  <h3 className="font-semibold text-gray-900 mb-2">Processing</h3>
                  <p className="text-sm text-gray-700 mb-2">{report.cognitiveProfile.processing.description}</p>
                  {report.cognitiveProfile.processing.preference && (
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
                      {report.cognitiveProfile.processing.preference}
                    </span>
                  )}
                </div>
              )}

              {/* Executive Function */}
              {report.cognitiveProfile.executiveFunction && (
                <div className="border border-gray-200 rounded-lg p-4 bg-orange-50">
                  <h3 className="font-semibold text-gray-900 mb-2">Executive Function</h3>
                  <p className="text-sm text-gray-700 mb-3">{report.cognitiveProfile.executiveFunction.description}</p>
                  {report.cognitiveProfile.executiveFunction.observations && report.cognitiveProfile.executiveFunction.observations.length > 0 && (
                    <ul className="space-y-1">
                      {report.cognitiveProfile.executiveFunction.observations.map((obs, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="text-orange-600 mt-1">▸</span>
                          <span>{obs}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            </div>
          )}

          {/* Meta-Learning Pillars */}
        {report.metaLearningPillars && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-teal-600">📚</span>
                Meta-Learning Pillars
              </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(report.metaLearningPillars).map(([key, pillar]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4 bg-teal-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900 capitalize text-sm">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <span className="text-xs font-bold text-teal-600 bg-white px-2 py-1 rounded">
                      {pillar.score}/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${(pillar.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-700 mb-2">{pillar.notes}</p>
                  {pillar.developmentStrategy && (
                    <p className="text-xs text-gray-600 italic">
                      <strong>Strategy:</strong> {pillar.developmentStrategy}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic Readiness */}
        {report.academicReadiness && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-green-600">📖</span>
              Academic Readiness
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {report.academicReadiness.english && (
                <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-gray-900 mb-2">English</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full capitalize mb-2 inline-block">
                    {report.academicReadiness.english.level}
                  </span>
                  <p className="text-sm text-gray-700 mb-2">{report.academicReadiness.english.notes}</p>
                  {report.academicReadiness.english.entryPoint && (
                    <p className="text-xs text-gray-600">
                      <strong>Entry Point:</strong> {report.academicReadiness.english.entryPoint}
                    </p>
                  )}
                </div>
              )}
              {report.academicReadiness.maths && (
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-gray-900 mb-2">Maths</h3>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full capitalize mb-2 inline-block">
                    {report.academicReadiness.maths.level}
                  </span>
                  <p className="text-sm text-gray-700 mb-2">{report.academicReadiness.maths.notes}</p>
                  {report.academicReadiness.maths.entryPoint && (
                    <p className="text-xs text-gray-600">
                      <strong>Entry Point:</strong> {report.academicReadiness.maths.entryPoint}
                    </p>
                  )}
                </div>
              )}
              {report.academicReadiness.science && (
                <div className="border border-gray-200 rounded-lg p-4 bg-purple-50">
                  <h3 className="font-semibold text-gray-900 mb-2">Science</h3>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full capitalize mb-2 inline-block">
                    {report.academicReadiness.science.level}
                        </span>
                  <p className="text-sm text-gray-700 mb-2">{report.academicReadiness.science.notes}</p>
                  {report.academicReadiness.science.entryPoint && (
                    <p className="text-xs text-gray-600">
                      <strong>Entry Point:</strong> {report.academicReadiness.science.entryPoint}
                    </p>
                  )}
                        </div>
              )}
                      </div>
            {report.academicReadiness.technologyComfort && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Technology Comfort:</strong> {report.academicReadiness.technologyComfort}
                </p>
                    </div>
            )}
            {report.academicReadiness.overallNotes && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">{report.academicReadiness.overallNotes}</p>
              </div>
            )}
            </div>
          )}

        {/* Emotional Profile */}
        {report.emotionalProfile && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-pink-600">💝</span>
              Emotional Profile
              </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {report.emotionalProfile.triggers && report.emotionalProfile.triggers.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Triggers</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.emotionalProfile.triggers.map((trigger, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full">
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {report.emotionalProfile.regulationStrategies && report.emotionalProfile.regulationStrategies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Regulation Strategies</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.emotionalProfile.regulationStrategies.map((strategy, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {strategy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {report.emotionalProfile.motivationFactors && report.emotionalProfile.motivationFactors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Motivation Factors</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.emotionalProfile.motivationFactors.map((factor, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {factor}
                        </span>
                    ))}
                      </div>
                    </div>
              )}
              {report.emotionalProfile.supportNeeds && report.emotionalProfile.supportNeeds.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Support Needs</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.emotionalProfile.supportNeeds.map((need, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        {need}
                          </span>
                        ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Social Profile */}
        {report.socialProfile && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-indigo-600">👥</span>
              Social Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Peer Dynamics</h3>
                <p className="text-sm text-gray-700">{report.socialProfile.peerDynamics}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Social Role</h3>
                <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full capitalize">
                  {report.socialProfile.socialRole}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Collaboration Style</h3>
                <p className="text-sm text-gray-700">{report.socialProfile.collaborationStyle}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Communication Strength</h3>
                <p className="text-sm text-gray-700">{report.socialProfile.communicationStrength}</p>
              </div>
            </div>
                      </div>
                    )}

        {/* Observational Insights */}
        {report.observationalInsights && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-amber-600">👁️</span>
              Observational Insights
            </h2>
            <div className="space-y-4">
              {report.observationalInsights.preferredZones && report.observationalInsights.preferredZones.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Preferred Zones</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.observationalInsights.preferredZones.map((zone, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {report.observationalInsights.engagementPatterns && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Engagement Patterns</h3>
                  <p className="text-sm text-gray-700">{report.observationalInsights.engagementPatterns}</p>
                </div>
              )}
              {report.observationalInsights.behavioralNotes && report.observationalInsights.behavioralNotes.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Behavioral Notes</h3>
                  <ul className="space-y-2">
                    {report.observationalInsights.behavioralNotes.map((note, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-amber-600 mt-1">▸</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Family Context */}
        {report.familyContext && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-rose-600">🏠</span>
              Family Context
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Parenting Style</h3>
                <p className="text-sm text-gray-700">{report.familyContext.parentingStyle}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Home Environment</h3>
                <p className="text-sm text-gray-700">{report.familyContext.homeEnvironment}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Family Support</h3>
                <p className="text-sm text-gray-700">{report.familyContext.familySupport}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Alignment with Philosophy</h3>
                <p className="text-sm text-gray-700">{report.familyContext.alignmentWithPhilosophy}</p>
              </div>
              </div>
            </div>
          )}

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {report.strengths && report.strengths.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-600 text-2xl">✓</span>
                Strengths
              </h2>
              <ul className="space-y-3">
                {report.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-600 mt-1 text-xl font-bold">•</span>
                    <span className="text-base">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {report.challenges && report.challenges.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-yellow-600 text-2xl">↗</span>
                Challenges
              </h2>
              <ul className="space-y-3">
                {report.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-yellow-600 mt-1 text-xl font-bold">•</span>
                    <span className="text-base">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {report.recommendations && report.recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-blue-600">💡</span>
              Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.recommendations.map((rec, idx) => (
                <div key={idx} className={`border rounded-lg p-5 ${getPriorityColor(rec.priority)}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{rec.action}</h3>
                      <span className="text-xs text-gray-600 capitalize bg-white px-2 py-1 rounded-full mt-1 inline-block">
                        {rec.category}
                      </span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold capitalize ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{rec.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Stage Level */}
        {report.keyStageLevel && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-violet-600">🎓</span>
              Key Stage Level
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Stage</h3>
                  <span className="text-sm px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
                    {report.keyStageLevel.keyStage}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Developmental Stage</h3>
                  <span className="text-sm px-3 py-1 bg-violet-100 text-violet-700 rounded-full capitalize">
                    {report.keyStageLevel.developmentalStage}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Age Group</h3>
                  <span className="text-sm px-3 py-1 bg-violet-100 text-violet-700 rounded-full">
                    {report.keyStageLevel.ageGroup}
                  </span>
                </div>
              </div>
              {report.keyStageLevel.subjectPlacements && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Subject Placements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report.keyStageLevel.subjectPlacements.english && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                        <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Year Level:</strong> {report.keyStageLevel.subjectPlacements.english.yearLevel}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Entry Topic:</strong> {report.keyStageLevel.subjectPlacements.english.entryTopic}
                        </p>
                        <p className="text-xs text-gray-600">{report.keyStageLevel.subjectPlacements.english.notes}</p>
                      </div>
                    )}
                    {report.keyStageLevel.subjectPlacements.maths && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                        <h4 className="font-semibold text-gray-900 mb-2">Maths</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Year Level:</strong> {report.keyStageLevel.subjectPlacements.maths.yearLevel}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Entry Topic:</strong> {report.keyStageLevel.subjectPlacements.maths.entryTopic}
                        </p>
                        <p className="text-xs text-gray-600">{report.keyStageLevel.subjectPlacements.maths.notes}</p>
                      </div>
                    )}
                    {report.keyStageLevel.subjectPlacements.science && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-purple-50">
                        <h4 className="font-semibold text-gray-900 mb-2">Science</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Year Level:</strong> {report.keyStageLevel.subjectPlacements.science.yearLevel}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <strong>Entry Topic:</strong> {report.keyStageLevel.subjectPlacements.science.entryTopic}
                        </p>
                        <p className="text-xs text-gray-600">{report.keyStageLevel.subjectPlacements.science.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {report.keyStageLevel.teachingApproaches && report.keyStageLevel.teachingApproaches.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Teaching Approaches</h3>
                  <ul className="space-y-2">
                    {report.keyStageLevel.teachingApproaches.map((approach, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-violet-600 mt-1">▸</span>
                        <span>{approach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
              {report.keyStageLevel.suggestedActions && report.keyStageLevel.suggestedActions.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Suggested Actions</h3>
                  <ul className="space-y-2">
                    {report.keyStageLevel.suggestedActions.map((action, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-violet-600 mt-1">▸</span>
                        <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
