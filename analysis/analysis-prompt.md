Role: Content Management System (CMS) Architect & Migration Specialist
Task: Structural Analysis and Migration Mapping for Adobe Edge Delivery Services (EDS)
Target: https://www.doc.govt.nz/

1. Objective & Scope
Perform a deep-dive technical analysis of the target domain to prepare for a migration to an EDS (Block-based) architecture. The goal is to translate existing UI patterns into high-performance EDS Blocks.
    - Domain Restriction: Analyze ONLY www.doc.govt.nz. Strictly ignore all sub-domains (e.g., maps.doc.govt.nz or blog.doc.govt.nz).
    - Data Privacy: Do NOT read, reference, or overwrite any existing analysis.md files.

2. Technical Methodology
Use the following tools and skills to conduct the audit:
    - Adobe Skills: Prioritize the 'Experience Modernization' skill to map HTML patterns to modern EDS Blocks. Use 'EDS Block Development' logic to define CSS/JS requirements.
    - Chrome MCP: For every identified component, use Chrome MCP to inspect the source code. Capture:
        - DOM structure and semantic nesting.
        - BEM naming conventions or specific CSS classes.
        - Data attributes used for functional logic or tracking.

    - Sampling Rigor: For each primary section (Parks & Recreation, Nature, Our Work, News, Get Involved, About Us), you must analyze 12–15 unique sample pages. This is critical to identify edge cases and component variations.

3. Required Outputs (Save to /analysis/ folder)
A. Findings Report (analysis2.md)
Document the global findings including:
    - Content Inventory: High-level site map and hierarchy.
    - UI Pattern Library: A table mapping current site elements to EDS equivalents (e.g., "Feature Tile Grid" $\rightarrow$ "Cards Block").
    - Metadata & Taxonomy: Analysis of <meta> tags, breadcrumb logic, and category tagging used for content filtering.

B. Master User Story Ledger (user-stories.md)
A consolidated file containing technical user stories for all identified components, formatted for Atlassian Rovo ingestion into Jira.

C. Individual Component Specs (/analysis/components/{component-name}.md)
Create a standalone file for every unique component (e.g., hero-user-story.md, navigation-user-story.md). Each file must include:
    1. User Story Title & Description: Defined by a "As a [User], I want to [Action] so that [Value]" format.
    2. Acceptance Criteria: Specific functional requirements (e.g., "Must support background video," "Must be authorable via universal editor").
    3. Technical Notes for EDS:
        -Structural requirements for the JS and CSS files.
    4. AI Implementation Instructions: A dedicated section for a developer-facing AI to use during the build phase:
        - Mandatory Skills: List specific Adobe skills the AI should invoke.
        - Validation Loop: "Use Chrome MCP iteratively to verify DOM output against the original site's functional requirements before marking the task complete."
    5. Live reference: Add reference to the live site for all variation of the components.