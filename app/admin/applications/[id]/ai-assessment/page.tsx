"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiService } from "@/app/utils";
import toast from "react-hot-toast";

interface UTLReport {
  student_id: string;
  report_id: string;
  generated_at: string;
  primary_learner_type?: string;
  learner_type_breakdown?: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    reading_writing: number;
  };
  learner_type_insights?: string;
  personality_traits?: Array<{
    trait_name: string;
    score: number;
    interpretation: string;
    implications: string[];
  }>;
  personality_summary?: string;
  subject_levels?: Array<{
    subject: string;
    current_level: number;
    recommended_level: number;
    gap_analysis: string;
    focus_areas: string[];
  }>;
  meta_learning_review?: {
    [key: string]: {
      score: number;
      analysis: string;
    };
  };
  meta_learning_summary?: string;
  skillmatrix_analysis?: Array<{
    skill_category: string;
    current_level: number;
    target_level: number;
    development_suggestions: string[];
  }>;
  recommended_meta_labs?: Array<{
    challenge_name: string;
    difficulty_level: string;
    skills_addressed: string[];
    priority: number;
    rationale: string;
  }>;
  strengths?: string[];
  areas_for_development?: string[];
  overall_summary?: string;
  immediate_actions?: string[];
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

  const hasInsufficientData = (text?: string) => {
    return text?.toLowerCase().includes("insufficient data") || false;
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

  const insufficientDataWarning = hasInsufficientData(report.overall_summary) || 
    hasInsufficientData(report.learner_type_insights) ||
    hasInsufficientData(report.personality_summary);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Assessment Report</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(report.generated_at)}
                </span>
                <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                  Report ID: {report.report_id}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Insufficient Data Warning */}
        {insufficientDataWarning && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Limited Data Available</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Some sections of this report show "Insufficient data" because the assessment data is incomplete or limited. Please ensure all 9 forms are fully completed with detailed information for a comprehensive analysis.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overall Summary */}
        {report.overall_summary && !hasInsufficientData(report.overall_summary) && (
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-xl shadow-lg border border-purple-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">📊</span>
              Overall Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{report.overall_summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Learner Type */}
          {report.primary_learner_type && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-600">🎯</span>
                Primary Learning Style
              </h2>
              <div className="mb-4">
                <div className="text-4xl font-bold text-purple-600 capitalize mb-3">
                  {report.primary_learner_type}
                </div>
                {report.learner_type_breakdown && Object.values(report.learner_type_breakdown).some(v => v > 0) && (
                  <div className="space-y-3 mt-4">
                    {Object.entries(report.learner_type_breakdown).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize text-gray-700 font-medium">{key.replace('_', ' ')}</span>
                          <span className="font-semibold text-gray-900">{value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {report.learner_type_insights && !hasInsufficientData(report.learner_type_insights) && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">{report.learner_type_insights}</p>
                </div>
              )}
            </div>
          )}

          {/* Personality Traits */}
          {report.personality_summary && !hasInsufficientData(report.personality_summary) && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-indigo-600">🧠</span>
                Personality Profile
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{report.personality_summary}</p>
              {report.personality_traits && report.personality_traits.length > 0 && (
                <div className="space-y-3">
                  {report.personality_traits.slice(0, 3).map((trait, idx) => (
                    <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded-r-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900">{trait.trait_name}</span>
                        <span className="text-sm font-bold text-indigo-600 bg-white px-2 py-1 rounded">{trait.score}%</span>
                      </div>
                      <p className="text-xs text-gray-600">{trait.interpretation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Meta-Learning Pillars */}
          {report.meta_learning_review && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">📚</span>
                Meta-Learning Pillars
              </h2>
              {report.meta_learning_summary && !hasInsufficientData(report.meta_learning_summary) && (
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{report.meta_learning_summary}</p>
              )}
              <div className="space-y-3">
                {Object.entries(report.meta_learning_review).map(([key, value]) => {
                  const isInsufficient = hasInsufficientData(value.analysis);
                  return (
                    <div key={key} className={`border-l-4 ${isInsufficient ? 'border-gray-300' : 'border-blue-500'} pl-4 py-2 ${isInsufficient ? 'bg-gray-50' : 'bg-blue-50'} rounded-r-lg`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-gray-900 capitalize">
                          {key.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-blue-600 bg-white px-2 py-1 rounded">{value.score}/5</span>
                        </div>
                      </div>
                      <p className={`text-xs ${isInsufficient ? 'text-gray-500 italic' : 'text-gray-600'}`}>{value.analysis}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subject Levels */}
          {report.subject_levels && report.subject_levels.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-green-600">📖</span>
                Subject Levels
              </h2>
              <div className="space-y-4">
                {report.subject_levels.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{subject.subject}</span>
                      <div className="flex gap-3">
                        <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">Current: {subject.current_level}</span>
                        <span className="text-sm font-bold text-purple-600 bg-white px-2 py-1 rounded">
                          Target: {subject.recommended_level}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{subject.gap_analysis}</p>
                    {subject.focus_areas && subject.focus_areas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {subject.focus_areas.map((area, aidx) => (
                          <span
                            key={aidx}
                            className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {report.strengths && report.strengths.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-shadow">
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

          {/* Areas for Development */}
          {report.areas_for_development && report.areas_for_development.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-yellow-600 text-2xl">↗</span>
                Areas for Development
              </h2>
              <ul className="space-y-3">
                {report.areas_for_development.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="text-yellow-600 mt-1 text-xl font-bold">•</span>
                    <span className="text-base">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recommended Meta Labs */}
        {report.recommended_meta_labs && report.recommended_meta_labs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-blue-600">🔬</span>
              Recommended Meta Labs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.recommended_meta_labs.map((lab, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-5 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{lab.challenge_name}</h3>
                      <span className="text-xs text-gray-500 capitalize bg-white px-2 py-1 rounded-full mt-1 inline-block">
                        {lab.difficulty_level}
                      </span>
                    </div>
                    <span className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full font-bold">
                      Priority {lab.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{lab.rationale}</p>
                  {lab.skills_addressed && lab.skills_addressed.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {lab.skills_addressed.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className="text-xs px-2 py-1 bg-white text-gray-700 rounded-full capitalize font-medium border border-gray-200"
                        >
                          {skill.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Immediate Actions */}
        {report.immediate_actions && report.immediate_actions.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-red-600 text-3xl">⚡</span>
              Immediate Actions
            </h2>
            <ul className="space-y-3">
              {report.immediate_actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-4 text-gray-700 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <span className="text-red-600 mt-1 font-bold text-xl bg-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-base pt-1">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skill Matrix Analysis */}
        {report.skillmatrix_analysis && report.skillmatrix_analysis.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-teal-600">📈</span>
              Skill Matrix Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.skillmatrix_analysis.map((skill, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{skill.skill_category}</h3>
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-600">Current: {skill.current_level}</span>
                      <span className="text-sm font-bold text-teal-600">Target: {skill.target_level}</span>
                    </div>
                  </div>
                  {skill.development_suggestions && skill.development_suggestions.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {skill.development_suggestions.map((suggestion, sidx) => (
                        <li key={sidx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-teal-600 mt-1">▸</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
