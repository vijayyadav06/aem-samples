<?xml version="1.0" encoding="UTF-8" ?>
<object class="GenericRobot2" serializationversion="1">
  <prologue>
    <saved-by-versions>
      <version>9.5.4</version>
    </saved-by-versions>
    <referenced-types>
      <type name="product_detail"/>
      <type name="jsonOutputFile"/>
    </referenced-types>
    <referenced-snippets/>
    <typed-variables>
      <typed-variable name="product_detail" type-name="product_detail"/>
      <typed-variable name="jsonOutputFile" type-name="jsonOutputFile"/>
    </typed-variables>
    <global-variables/>
    <parameters/>
    <return-variables>
      <variable name="jsonOutputFile"/>
    </return-variables>
    <store-in-database-variables/>
    <browser-engine>WEBKIT</browser-engine>
  </prologue>
  <property name="variables" class="Variables">
    <object class="Variable" serializationversion="1">
      <property name="name" class="String">fileName</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" class="SimpleTypeReference" id="0">
          <property name="simpleTypeId" class="Integer">12</property>
        </property>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String">fileType</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" idref="0"/>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String">asset</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" idref="0"/>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String">product_detail</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" class="TypeReference" serializationversion="0">
          <property name="typeName" class="String">product_detail</property>
        </property>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String" id="1">jsonOutputFile</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" class="TypeReference" serializationversion="0">
          <property name="typeName" class="String">jsonOutputFile</property>
        </property>
        <property name="assignments" class="AttributeAssignments">
          <property name="outFile" class="AttributeAssignment">
            <property name="attributeValue" class="String">{
  "root" : {
             "content" : {
                           "content-par" : {
                                             "product-detail" : {
                                                                  "jcr:lastModified" : "{Date}2015-11-23T16:18:03.103-06:00",
                                                                  "jcr:lastModifiedBy" : "krulir1",
                                                                  "jcr:primaryType" : "nt:unstructured",
                                                                  "sling:resourceType" : "medtronic-com/components/content/product-detail",
                                                                  "audienceType" : "Healthcare Professionals",
                                                                  "image" : "\\{\"path\":\"/content/dam/medtronic-com/evera-mri-xt-dr-hero.jpg\",\"altText\":\"Evera-MRI-XT-DR-hero\"}",
                                                                  "iswGraphic" : "alternateText",
                                                                  "iswURL" : "http://www.medtronic.com/for-healthcare-professionals/products-therapies/cardiac-rhythm/implantable-cardioverter-defibrillators-icds/evera-mri-xt-dr-vr/indications-safety-warnings/index.htm",
                                                                  "modelSku" : "none",
                                                                  "overviewText" : "&lt;h1&gt;Evera MRI XT DR and VR ICD Defibrillators&lt;/h1&gt;\n&lt;p&gt;Introducing MRI access. Medtronic’s first MR-conditional ICD.&lt;/p&gt;\n",
                                                                  "productName" : "Evera MRI XT DR and VR",
                                                                  "productSubTitle" : "ICD Defibrillators",
                                                                  "title1" : "Overview"
                                                                },
                                             "titletext" : {
                                                             "jcr:created" : "{Date}2015-11-23T16:30:48.436-06:00",
                                                             "jcr:createdBy" : "krulir1",
                                                             "jcr:lastModified" : "{Date}2015-11-23T16:31:11.017-06:00",
                                                             "jcr:lastModifiedBy" : "krulir1",
                                                             "jcr:primaryType" : "nt:unstructured",
                                                             "sling:resourceType" : "medtronic-com/components/content/title-text",
                                                             "groups" : "\\{\"title\":\"Overview\",\"text\":\"&lt;h2 class=\\\\\"first\\\\\"&gt;&lt;p&gt;Medtronic's first MR-conditional ICD.&lt;/p&gt;\\\\n&lt;/h2&gt;\\\\n\\\\n\\\\t\\\\t\\\\t\\\\t&lt;p&gt;&lt;strong&gt;Contoured&lt;/strong&gt;. The PhysioCurve™ shape is designed with patient comfort in mind with a 30% reduction* in skin pressure.&lt;sup&gt;1&lt;/sup&gt;&lt;/p&gt;\\\\n &lt;p&gt;&lt;strong&gt;Long-lasting&lt;/strong&gt;. Up to 25% greater longevity than our Protecta ICD,&lt;sup&gt;2**&lt;/sup&gt; so patients spend more time living, and less time getting device replacements.&lt;/p&gt;\\\\n &lt;p&gt;&lt;strong&gt;Smart&lt;/strong&gt;. SmartShock™, the most advanced shock reduction suite. Enhanced, so patients receive fewer inappropriate shocks.&lt;sup&gt;3&lt;/sup&gt;&lt;/p&gt;\\\\n\"}"
                                                           },
                                             "referencefootnote" : {
                                                                     "jcr:created" : "{Date}2015-11-23T16:32:28.310-06:00",
                                                                     "jcr:createdBy" : "krulir1",
                                                                     "jcr:lastModified" : "{Date}2015-11-23T16:45:59.280-06:00",
                                                                     "jcr:lastModifiedBy" : "krulir1",
                                                                     "jcr:primaryType" : "nt:unstructured",
                                                                     "sling:resourceType" : "medtronic-com/components/content/reference-footnote",
                                                                     "data" : "[&lt;p&gt;Flo\\, Daniel. Device Shape Analysis. January 2013. Medtronic data on file.&lt;/p&gt;\n,&lt;p&gt;Evera DR/VR ICD Manuals.&lt;/p&gt;\n,&lt;p&gt;Medtronic data on file. November 15\\, 2012.&lt;/p&gt;\n&lt;p&gt;*Analysis was done on DR devices.&lt;br&gt;\n**Projected service life estimates are based on accelerated battery discharge data and device modeling as specified. Do not interpret these values as precise numbers.&lt;/p&gt;\n]",
                                                                     "displayType" : "references",
                                                                     "title" : "References"
                                                                   },
                                             "accordion" : {
                                                             "sectionPath0row" : {
                                                                                   "titletext" : {
                                                                                                   "jcr:created" : "{Date}2015-11-23T16:38:00.848-06:00",
                                                                                                   "jcr:createdBy" : "krulir1",
                                                                                                   "jcr:lastModified" : "{Date}2015-11-23T16:41:49.633-06:00",
                                                                                                   "jcr:lastModifiedBy" : "krulir1",
                                                                                                   "jcr:primaryType" : "nt:unstructured",
                                                                                                   "sling:resourceType" : "medtronic-com/components/content/title-text",
                                                                                                   "groups" : "\\{\"title\":\"Introducing MRI Access\",\"text\":\"&lt;h3&gt;Meeting the Need for Safe MRI Scanning and ICDs&lt;/h3&gt;\\\\n&lt;p&gt;It is estimated that up to 53 to 64% of ICD patients will have a medical need for an MRI within 10 years.&lt;sup&gt;1&lt;/sup&gt;&lt;/p&gt;\\\\n&lt;h3&gt;Convergence of Needs: MRI and ICDs&lt;/h3&gt;\\\\n&lt;p&gt;Elderly patients are the primary users of MRI. Individuals over age 65 are twice as likely to need an MRI compared to younger patients.&lt;sup&gt;2&lt;/sup&gt;&lt;/p&gt;\\\\n&lt;p&gt;The potential need for an ICD also increases with age.&lt;/p&gt;\\\\n&lt;h3&gt;Comprehensive Patient Care&lt;/h3&gt;\\\\n\"}"
                                                                                                 },
                                                                                   "titletextasset" : {
                                                                                                        "jcr:created" : "{Date}2015-11-23T16:38:51.351-06:00",
                                                                                                        "jcr:createdBy" : "krulir1",
                                                                                                        "jcr:lastModified" : "{Date}2015-11-23T16:42:09.808-06:00",
                                                                                                        "jcr:lastModifiedBy" : "krulir1",
                                                                                                        "jcr:primaryType" : "nt:unstructured",
                                                                                                        "sling:resourceType" : "medtronic-com/components/content/title-text-asset",
                                                                                                        "altText" : "Evera MRI Specification Graph",
                                                                                                        "headline" : "Comprehensive Patient Care",
                                                                                                        "image" : "/content/dam/medtronic-com/evera-mri-specification-graph.jpg",
                                                                                                        "imagePosition" : "top",
                                                                                                        "rte" : "&lt;p&gt;Medical and surgical specialties rely on MRI for diagnosis. In fact, MRI is the gold standard diagnostic tool for soft tissue imaging for neurologists, oncologists, and orthopedic surgeons. Your ICD choice today can affect their decisions and diagnostic capabilities tomorrow.&amp;nbsp;&lt;/p&gt;\n&lt;h3&gt;How the Evera MRI ICD System Works&lt;/h3&gt;\n&lt;p&gt;The Evera MRI ICD System with SureScan&lt;sup&gt;®&lt;/sup&gt; technology has met the rigors of clinical evaluation, regulatory review, and FDA approval.&amp;nbsp;&lt;/p&gt;\n&lt;h3&gt;The Evera MRI ICD Was Built for the MRI Environment&lt;/h3&gt;\n&lt;p&gt;Multiple safety features were designed and incorporated from the ground up:&lt;/p&gt;\n&lt;ul&gt;\n&lt;li&gt;Device verification appears on ICD programmer screen&lt;/li&gt;\n&lt;li&gt;One-screen programming clearly outlines necessary steps to scanning and pacing&lt;/li&gt;\n&lt;li&gt;Device contains robust circuitry&lt;/li&gt;\n&lt;li&gt;Dedicated programming mode provides additional security and backup for &amp;quot;Power On Reset&amp;quot; (POR)&lt;/li&gt;\n&lt;li&gt;SureScan Timeout protects the patient from prolonged exposure to spontaneous tachyarrhythmia and VT/VF induction&lt;/li&gt;\n&lt;li&gt;Hall sensor immune to strong magnetic fields&lt;/li&gt;\n&lt;/ul&gt;\n&lt;h3&gt;Two SureScan ICD Lead Options That Are Proven Safe and Effective in the MRI Environment&lt;/h3&gt;\n&lt;p&gt;The two available SureScan lead options for SureScan ICDs include:&lt;/p&gt;\n&lt;ul&gt;\n&lt;li&gt;Sprint Quattro Secure S™ MRI SureScan™ 6935M&lt;/li&gt;\n&lt;li&gt;Sprint Quattro Secure™ MRI SureScan™ 6947M&lt;/li&gt;\n&lt;/ul&gt;\n&lt;h3&gt;SureScan Pacing Lead Options That Are Proven Safe and Effective in the MRI Environment&lt;/h3&gt;\n&lt;p&gt;The SureScan pacing lead options for use with dual chamber SureScan ICDS include:&amp;nbsp;&lt;/p&gt;\n&lt;ul&gt;\n&lt;li&gt;CapSureFix Novus MRI™ SureScan™ 5076&lt;/li&gt;\n&lt;li&gt;CapSureFix MRI™ SureScan™ 5086MRI&lt;/li&gt;\n&lt;/ul&gt;\n&lt;h3&gt;Builds Upon Medtronic Innovations&lt;/h3&gt;\n&lt;ul&gt;\n&lt;li&gt;Managed Ventricular Pacing (MVP&lt;sup&gt;®&lt;/sup&gt;) promotes intrinsic conduction and reduces unnecessary right ventricular pacing by 99%&lt;sup&gt;3&lt;/sup&gt;&lt;/li&gt;\n&lt;li&gt;Cardiac Compass&lt;sup&gt;®&lt;/sup&gt; graphically displays more than a year of trended data to help monitor and manage AF and AT&lt;/li&gt;\n&lt;/ul&gt;\n&lt;p&gt;For additional information on SureScan Systems, please visit &lt;a href=\"http://www.mrisurescan.com\"&gt;www.mrisurescan.com&lt;/a&gt;&lt;/p&gt;\n"
                                                                                                      },
                                                                                   "referencefootnote" : {
                                                                                                           "jcr:created" : "{Date}2015-11-23T16:42:41.418-06:00",
                                                                                                           "jcr:createdBy" : "krulir1",
                                                                                                           "jcr:lastModified" : "{Date}2015-11-23T16:44:04.115-06:00",
                                                                                                           "jcr:lastModifiedBy" : "krulir1",
                                                                                                           "jcr:primaryType" : "nt:unstructured",
                                                                                                           "sling:resourceType" : "medtronic-com/components/content/reference-footnote",
                                                                                                           "data" : "[&lt;p&gt;Nazarian S\\, Reynolds M\\, Ryan M\\, et al. Estimating the Likelihood of MRI \nin Patients after ICD Implantation: A 10-Year Prediction Model. &lt;em&gt;J Am Coll Cardiol.&lt;/em&gt; March 2015;65(10 Supp):A1090.&lt;/p&gt;\n,&lt;p&gt;Global Industry Analysts\\, Inc. Magnetic Resonance Imaging (MRI) \nEquipment – A Global Strategic Business Report. San Jose\\, CA. 2002.&lt;/p&gt;\n,&lt;p&gt;Gillis AM\\, Pürerfellner H\\, Israel CW\\, et al. Reduction of \nunnecessary right ventricular pacing due to the managed ventricular \npacing (MVP®) mode in patients with symptomatic bradycardia. Benefit for\n both sinus node disease and AV block indications. &lt;em&gt;Heart Rhythm.&lt;/em&gt; 2005;Abstract AB21-1.&lt;/p&gt;\n]",
                                                                                                           "displayType" : "references",
                                                                                                           "title" : "Reference"
                                                                                                         },
                                                                                   "jcr:primaryType" : "nt:unstructured",
                                                                                   "sling:resourceType" : "foundation/components/parsys"
                                                                                 },
                                                             "sectionPath1row" : {
                                                                                   "migrationcontent" : {
                                                                                                          "jcr:created" : "{Date}2015-11-23T16:54:09.654-06:00",
                                                                                                          "jcr:createdBy" : "krulir1",
                                                                                                          "jcr:lastModified" : "{Date}2015-11-23T17:07:04.601-06:00",
                                                                                                          "jcr:lastModifiedBy" : "krulir1",
                                                                                                          "jcr:primaryType" : "nt:unstructured",
                                                                                                          "sling:resourceType" : "medtronic-com/components/content/migration-content",
                                                                                                          "html" : "\n\u0009\u0009\u0009\u0009&lt;h2&gt;Specifications&lt;/h2&gt;\n\u0009\u0009\u0009\u0009&lt;h3&gt;Evera MRI XT Single Chamber&lt;/h3&gt; &lt;table class=\"chart center\" border=\"0\" cellpadding=\"5\" cellspacing=\"5\" width=\"500\"&gt;     &lt;tbody&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;FEATURE&lt;/th&gt;             &lt;th&gt;EVERA&lt;/th&gt;             &lt;th&gt;EVERA MRI&lt;/th&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\" width=\"45%\"&gt;&lt;strong&gt;SureScan™ Technology&lt;/strong&gt;&lt;br&gt;             Full Body MRI&lt;/th&gt;             &lt;td width=\"30%\"&gt;&amp;nbsp;&lt;/td&gt;             &lt;td align=\"center\" width=\"20%\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;SmartShock™&lt;/strong&gt;&lt;br&gt;             Six Medtronic exclusive algorithms, proven by the PainFREE SST Study. 98% of patients are free of inappropriate shocks at one year.&lt;sup&gt;1&lt;/sup&gt;&lt;/th&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;PhysioCurve™&lt;/strong&gt;&lt;br&gt;             Designed for patient comfort. 30% less skin pressure versus conventional ICD shapes.&lt;sup&gt;2&lt;/sup&gt;&lt;/th&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;CareLink&lt;sup&gt;®&lt;/sup&gt; Network&lt;/strong&gt;&lt;br&gt;             Remote monitoring capability for all cardiac devices&lt;/th&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;Longevity&lt;/strong&gt;&lt;/th&gt;             &lt;td&gt;25% greater than Protecta&lt;br&gt;             &lt;br&gt;             10 year extended warranty (XT)&lt;/td&gt;             &lt;td&gt;Same as Evera&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;OptiVol&lt;sup&gt;®&lt;/sup&gt;&lt;/strong&gt;&lt;br&gt;             Fluid Status Monitoring&lt;/th&gt;             &lt;td&gt;XT Only&lt;/td&gt;             &lt;td&gt;XT Only&lt;/td&gt;         &lt;/tr&gt;     &lt;/tbody&gt; &lt;/table&gt; &lt;h3&gt;Evera MRI XT Dual Chamber&lt;/h3&gt; &lt;table class=\"chart center\" border=\"0\" cellpadding=\"5\" cellspacing=\"5\" width=\"500\"&gt;     &lt;tbody&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;FEATURE&lt;/th&gt;             &lt;th&gt;EVERA&lt;/th&gt;             &lt;th&gt;EVERA MRI&lt;/th&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\" width=\"45%\"&gt;&lt;strong&gt;SureScan™ Technology&lt;/strong&gt;&lt;br&gt;             Full Body MRI&lt;/th&gt;             &lt;td width=\"30%\"&gt;&amp;nbsp;&lt;/td&gt;             &lt;td align=\"center\" width=\"20%\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;SmartShock™&lt;/strong&gt;&lt;br&gt;             Six Medtronic exclusive algorithms, proven by the PainFREE SST Study. 98% of patients are free of inappropriate shocks at one year.&lt;sup&gt;1&lt;/sup&gt;&lt;/th&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;PhysioCurve™&lt;/strong&gt;&lt;br&gt;             Designed for patient comfort. 30% less skin pressure versus conventional ICD shapes.&lt;sup&gt;2&lt;/sup&gt;&lt;/th&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;AF Diagnostics*&lt;/strong&gt;&lt;/th&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;CareLink&lt;sup&gt;®&lt;/sup&gt; Network&lt;/strong&gt;&lt;br&gt;             Remote monitoring capability for all cardiac devices&lt;/th&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;             &lt;td align=\"center\"&gt;✓&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;Longevity&lt;/strong&gt;&lt;/th&gt;             &lt;td&gt;25% greater than Protecta&lt;br&gt;             &lt;br&gt;             8 year warranty (XT)&lt;/td&gt;             &lt;td&gt;Same as Evera&lt;br&gt;             &lt;br&gt;             8 year warranty (XT)&lt;/td&gt;         &lt;/tr&gt;         &lt;tr&gt;             &lt;th class=\"first-col\"&gt;&lt;strong&gt;OptiVol&lt;sup&gt;®&lt;/sup&gt;&lt;/strong&gt;&lt;br&gt;             Fluid Status Monitoring&lt;/th&gt;             &lt;td&gt;XT Only&lt;/td&gt;             &lt;td&gt;XT Only&lt;/td&gt;         &lt;/tr&gt;     &lt;/tbody&gt; &lt;/table&gt; &lt;div class=\"reference\"&gt;&lt;p class=\"no-space\"&gt;&lt;strong&gt;Reference&lt;/strong&gt;&lt;/p&gt; &lt;ol&gt;     &lt;li&gt;Auricchio A, Schloss EJ, Kurita T, et al. Low inappropriate shock rates in patients with single- and dual/triple-chamber implantable cardioverter-defibrillators using a novel suite of detection algorithms: PainFree SST trial primary results. &lt;em&gt;Heart Rhythm.&lt;/em&gt; May 2015;12(5):926-936.&lt;/li&gt;     &lt;li&gt;Flo, Daniel. Device Shape Analysis. January 2013. Medtronic data on file.&lt;/li&gt; &lt;/ol&gt;&lt;/div&gt;"
                                                                                                        },
                                                                                   "jcr:primaryType" : "nt:unstructured",
                                                                                   "sling:resourceType" : "foundation/components/parsys"
                                                                                 },
                                                             "sectionPath2row" : {
                                                                                   "migrationcontent" : {
                                                                                                          "jcr:created" : "{Date}2015-11-23T17:09:01.084-06:00",
                                                                                                          "jcr:createdBy" : "krulir1",
                                                                                                          "jcr:lastModified" : "{Date}2015-11-23T17:09:09.215-06:00",
                                                                                                          "jcr:lastModifiedBy" : "krulir1",
                                                                                                          "jcr:primaryType" : "nt:unstructured",
                                                                                                          "sling:resourceType" : "medtronic-com/components/content/migration-content",
                                                                                                          "html" : "&lt;h2&gt;SureScan Leads&lt;/h2&gt;\n\u0009\u0009\u0009\u0009&lt;table class=\"chart\" border=\"0\" cellpadding=\"5\" cellspacing=\"5\" width=\"500\"&gt;\n    &lt;tbody&gt;\n        &lt;tr bgcolor=\"#68A2C4\"&gt;\n            &lt;th class=\"first-col\"&gt;SURESCAN LEADS&lt;/th&gt;\n            &lt;th&gt;6947M&lt;/th&gt;\n            &lt;th&gt;6935M&lt;/th&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\" width=\"30%\"&gt;Type&lt;/th&gt;\n            &lt;td bgcolor=\"#eeeeee\" width=\"30%\"&gt;Dual coil, quadripolar&lt;/td&gt;\n            &lt;td bgcolor=\"#eeeeee\" width=\"30%\"&gt;Single coil, tripolar&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\"&gt;Fixation&lt;/th&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;Helix, active fixation&lt;/td&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;Helix, active fixation&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\"&gt;Inner/Outer Insulator&lt;/th&gt;\n            &lt;td bgcolor=\"#eeeeee\"&gt;Silicone, PTFE, ETFE&lt;/td&gt;\n            &lt;td bgcolor=\"#eeeeee\"&gt;Silicone, PTFE, ETFE&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\"&gt;Body&lt;/th&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;8.6 Fr (2.8 mm)&lt;/td&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;8.6 Fr (2.8 mm)&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\"&gt;Recommended Introducer Size&lt;/th&gt;\n            &lt;td bgcolor=\"#eeeeee\"&gt;Without guide wire 9.0 Fr (3.0 mm)&lt;br&gt;&lt;br&gt;With guide wire 11.0 Fr (3.7 mm)&lt;/td&gt;\n            &lt;td bgcolor=\"#eeeeee\"&gt;Without guide wire 9.0 Fr (3.0 mm)&lt;br&gt;&lt;br&gt;With guide wire 11.0 Fr (3.7 mm)&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\"&gt;Spacing&lt;/th&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;8 mm tip-ring&lt;br&gt;&lt;br&gt;12 mm tip-distal RV coil&lt;br&gt;&lt;br&gt;180 mm tip-SVC electrode&lt;/td&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;8 mm tip-ring&lt;br&gt;&lt;br&gt;12 mm tip-distal RV coil&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\"&gt;MR Conditional Lengths&lt;/th&gt;\n            &lt;td bgcolor=\"#eeeeee\"&gt;55, 62 cm&lt;/td&gt;\n            &lt;td bgcolor=\"#eeeeee\"&gt;55, 62 cm&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;tr&gt;\n            &lt;th class=\"first-col\" bgcolor=\"#68A2C4\"&gt;Approved MR Conditional Devices&lt;/th&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;Evera MRI™ XT DR DDMB1D4&lt;br&gt;&lt;br&gt;Evera MRI S DR DDMC3D4&lt;br&gt;&lt;br&gt;Evera MRI XT VR DVMB1D4&lt;/td&gt;\n            &lt;td bgcolor=\"#ffffff\"&gt;Evera MRI™ XT DR DDMB1D4&lt;br&gt;&lt;br&gt;Evera MRI S DR DDMC3D4&lt;br&gt;&lt;br&gt;Evera MRI XT VR DVMB1D4&lt;/td&gt;\n        &lt;/tr&gt;\n    &lt;/tbody&gt;\n&lt;/table&gt;"
                                                                                                        },
                                                                                   "jcr:primaryType" : "nt:unstructured",
                                                                                   "sling:resourceType" : "foundation/components/parsys"
                                                                                 },
                                                             "jcr:created" : "{Date}2015-11-23T16:33:54.848-06:00",
                                                             "jcr:createdBy" : "krulir1",
                                                             "jcr:lastModified" : "{Date}2015-11-23T16:34:30.425-06:00",
                                                             "jcr:lastModifiedBy" : "krulir1",
                                                             "jcr:primaryType" : "nt:unstructured",
                                                             "sling:resourceType" : "medtronic-com/components/content/accordion",
                                                             "sections" : "[{\"title\":\"MRI\"\\,\"columns\":\"one\"\\,\"sectionPath\":\"sectionPath0\"},{\"title\":\"SPECIFICATION\"\\,\"columns\":\"one\"\\,\"sectionPath\":\"sectionPath1\"},{\"title\":\"SURESCAN LEADS\"\\,\"columns\":\"one\"\\,\"sectionPath\":\"sectionPath2\"}]"
                                                           },
                                             "jcr:primaryType" : "nt:unstructured",
                                             "sling:resourceType" : "wcm/foundation/components/iparsys"
                                           },
                           "content-par2" : {
                                              "jcr:primaryType" : "nt:unstructured",
                                              "sling:resourceType" : "wcm/foundation/components/iparsys"
                                            },
                           "right-rail" : {
                                            "manualrelatedlinks" : {
                                                                     "jcr:created" : "{Date}2015-11-23T17:25:25.894-06:00",
                                                                     "jcr:createdBy" : "krulir1",
                                                                     "jcr:lastModified" : "{Date}2015-11-24T14:00:02.712-06:00",
                                                                     "jcr:lastModifiedBy" : "krulir1",
                                                                     "jcr:primaryType" : "nt:unstructured",
                                                                     "sling:resourceType" : "medtronic-com/components/content/manual-related-links",
                                                                     "componentHeading" : "Related Links",
                                                                     "section" : "\\{\"sectionHeading\":\"\",\"sectionLinks\":[\"{\\\\\"linkText\\\\\":\\\\\"MRI\\\\\",\\\\\"linkURL\\\\\":\\\\\"/content/medtronic-com/rob-home-page/evera-mri-xt-dr-and-vr/evera-mri-xt-dr-and-vrmri\\\\\",\\\\\"newTab\\\\\":[]}\",\"{\\\\\"linkText\\\\\":\\\\\"Leads and Delivery Systems\\\\\",\\\\\"linkURL\\\\\":\\\\\"/content/medtronic-com/rob-home-page/evera-mri-xt-dr-and-vr/evera-mri-xt-dr-and-vrleadsanddeliverysystem\\\\\",\\\\\"newTab\\\\\":[]}\",\"{\\\\\"linkText\\\\\":\\\\\"Clinical Studies and Outcomes\\\\\",\\\\\"linkURL\\\\\":\\\\\"/content/medtronic-com/rob-home-page/evera-mri-xt-dr-and-vr/evera-mri-xt-dr-and-vrclinicalstudiesandoutcomes\\\\\",\\\\\"newTab\\\\\":[]}\",\"{\\\\\"linkText\\\\\":\\\\\"Patient Management\\\\\",\\\\\"linkURL\\\\\":\\\\\"/content/medtronic-com/rob-home-page/evera-mri-xt-dr-and-vr/evera-mri-xt-dr-and-vrpatientmanagement\\\\\",\\\\\"newTab\\\\\":[]}\",\"{\\\\\"linkText\\\\\":\\\\\"Coverage and Reimbursement\\\\\",\\\\\"linkURL\\\\\":\\\\\"/content/medtronic-com/rob-home-page/evera-mri-xt-dr-and-vr/evera-mri-xt-dr-and-vrcoverageandreimbursement\\\\\",\\\\\"newTab\\\\\":[]}\",\"{\\\\\"linkText\\\\\":\\\\\"Education and Training\\\\\",\\\\\"linkURL\\\\\":\\\\\"/content/medtronic-com/rob-home-page/evera-mri-xt-dr-and-vr/evera-mri-xt-dr-and-vreducationandtraining\\\\\",\\\\\"newTab\\\\\":[]}\",\"{\\\\\"linkText\\\\\":\\\\\"Manuals and Technical Resources\\\\\",\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/cardiac-rhythm/implantable-cardioverter-defibrillators-icds/evera-mri-xt-dr-vr/Manuals%20and%20Technical%20Resources/index.htm\\\\\",\\\\\"newTab\\\\\":[]}\"]}"
                                                                   },
                                            "manualrelatedlinks2030558754" : {
                                                                               "jcr:created" : "{Date}2015-11-24T10:13:28.609-06:00",
                                                                               "jcr:createdBy" : "krulir1",
                                                                               "jcr:lastModified" : "{Date}2015-11-24T10:26:19.078-06:00",
                                                                               "jcr:lastModifiedBy" : "krulir1",
                                                                               "jcr:primaryType" : "nt:unstructured",
                                                                               "sling:resourceType" : "medtronic-com/components/content/manual-related-links",
                                                                               "componentHeading" : "Related Therapy",
                                                                               "section" : "[{\"sectionHeading\":\"\"\\,\"sectionLinks\":[\"{\\\\\"linkText\\\\\":\\\\\"Tachyarrhythmia Management\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/cardiac-rhythm/therapies/tachyarrhythmia-management/index.htm\\\\\"\\,\\\\\"newTab\\\\\":[]}\"]},{\"sectionHeading\":\"\"\\,\"sectionLinks\":[\"{\\\\\"linkText\\\\\":\\\\\"Clinical Guidelines and Indications\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/cardiac-rhythm/therapies/tachyarrhythmia-management/clincial-guidelines-indications/index.htm\\\\\"\\,\\\\\"newTab\\\\\":[]}\"\\,\"{\\\\\"linkText\\\\\":\\\\\"Clinical Studies and Outcomes\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/cardiac-rhythm/therapies/tachyarrhythmia-management/clinical-studies-outcomes/index.htm\\\\\"\\,\\\\\"newTab\\\\\":[]}\"]}]"
                                                                             },
                                            "manualrelatedlinks257224904" : {
                                                                              "jcr:created" : "{Date}2015-11-24T10:26:52.855-06:00",
                                                                              "jcr:createdBy" : "krulir1",
                                                                              "jcr:lastModified" : "{Date}2015-11-24T10:50:47.140-06:00",
                                                                              "jcr:lastModifiedBy" : "krulir1",
                                                                              "jcr:primaryType" : "nt:unstructured",
                                                                              "sling:resourceType" : "medtronic-com/components/content/manual-related-links",
                                                                              "componentHeading" : "Life of a Device",
                                                                              "section" : "[{\"sectionHeading\":\"An in-depth look at the quality built into every Medtronic cardiac device  View Videos\"\\,\"sectionLinks\":[\"{\\\\\"linkText\\\\\":\\\\\"Part 1: Introduction\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/video/protecta-device-quality/index.htm?TBiframe=true&amp;height=323&amp;width=480\\\\\"\\,\\\\\"newTab\\\\\":[]}\"]},{\"sectionHeading\":\"\"\\,\"sectionLinks\":[\"{\\\\\"linkText\\\\\":\\\\\"Part 2: Concept\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/video/protecta-device-concept/index.htm?TBiframe=true&amp;height=323&amp;width=480\\\\\"\\,\\\\\"newTab\\\\\":[]}\"\\,\"{\\\\\"linkText\\\\\":\\\\\"Part 3: Design and Development\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/video/protecta-device-design/index.htm?TBiframe=true&amp;height=323&amp;width=480\\\\\"\\,\\\\\"newTab\\\\\":[]}\"\\,\"{\\\\\"linkText\\\\\":\\\\\"Part 4: Manufacturing\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/video/protecta-device-mfg/index.htm?TBiframe=true&amp;height=323&amp;width=480\\\\\"\\,\\\\\"newTab\\\\\":[]}\"\\,\"{\\\\\"linkText\\\\\":\\\\\"Part 5: Customer Service and Distribution\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/video/protecta-device-csanddist/index.htm?TBiframe=true&amp;height=323&amp;width=480\\\\\"\\,\\\\\"newTab\\\\\":[]}\"\\,\"{\\\\\"linkText\\\\\":\\\\\"Part 6: Vigilance and Monitoring\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/video/protecta-device-vigilance/index.htm?TBiframe=true&amp;height=323&amp;width=480\\\\\"\\,\\\\\"newTab\\\\\":[]}\"\\,\"{\\\\\"linkText\\\\\":\\\\\"Part 7: Conclusion\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/video/protecta-device-end/index.htm?TBiframe=true&amp;height=323&amp;width=480\\\\\"\\,\\\\\"newTab\\\\\":[]}\"]},{\"sectionHeading\":\"Unique Features  Other unique features are available.\"\\,\"sectionLinks\":[\"{\\\\\"linkText\\\\\":\\\\\"More\\\\\"\\,\\\\\"linkURL\\\\\":\\\\\"http://www.medtronic.com/for-healthcare-professionals/products-therapies/cardiac-rhythm/therapies/unique-features/index.htmhttp://www.medtronic.com/for-healthcare-professionals/products-therapies/cardiac-rhythm/therapies/unique-features/index.htm\\\\\"\\,\\\\\"newTab\\\\\":[]}\"]}]"
                                                                            },
                                            "richtexteditor" : {
                                                                 "jcr:created" : "{Date}2015-11-24T10:51:18.641-06:00",
                                                                 "jcr:createdBy" : "krulir1",
                                                                 "jcr:lastModified" : "{Date}2015-11-24T10:51:26.887-06:00",
                                                                 "jcr:lastModifiedBy" : "krulir1",
                                                                 "jcr:primaryType" : "nt:unstructured",
                                                                 "sling:resourceType" : "medtronic-com/components/content/rich-text-editor",
                                                                 "richText" : "&lt;p&gt;Medtronic 24-Hour Technical Support&lt;/p&gt;\n&lt;p&gt;&lt;p&gt;(800) 328-2518&lt;/p&gt;\n&lt;/p&gt;\n"
                                                               },
                                            "jcr:primaryType" : "nt:unstructured",
                                            "sling:resourceType" : "wcm/foundation/components/parsys"
                                          },
                           "cq:designPath" : "/etc/designs/medtronic-com",
                           "cq:lastModified" : "{Date}2015-11-24T14:00:02.721-06:00",
                           "cq:lastModifiedBy" : "krulir1",
                           "cq:template" : "/apps/medtronic-com/templates/product-detail-page",
                           "jcr:primaryType" : "cq:PageContent",
                           "jcr:title" : "Evera MRI XT DR and VR",
                           "sling:resourceType" : "medtronic-com/components/pages/product-detail-page",
                           "prefix" : "jcr"
                         },
             "evera-mri-xt-dr-and-vrleadsanddeliverysystem" : "",
             "evera-mri-xt-dr-and-vrmri" : "",
             "evera-mri-xt-dr-and-vrclinicalstudiesandoutcomes" : "",
             "evera-mri-xt-dr-and-vrpatientmanagement" : "",
             "evera-mri-xt-dr-and-vrcoverageandreimbursement" : "",
             "evera-mri-xt-dr-and-vreducationandtraining" : "",
             "xmlns:sling" : "http://sling.apache.org/jcr/sling/1.0",
             "xmlns:cq" : "http://www.day.com/jcr/cq/1.0",
             "xmlns:jcr" : "http://www.jcp.org/jcr/1.0",
             "xmlns:nt" : "http://www.jcp.org/jcr/nt/1.0",
             "jcr:primaryType" : "cq:Page",
             "prefix" : "jcr"
           }
}</property>
            <property name="lastKnownAttributeType" class="java.lang.Class">kapow.robot.plugin.common.domain.JSONAttributeType</property>
          </property>
        </property>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String">extension</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" idref="0"/>
        <property name="assignments" class="AttributeAssignments">
          <property name="value" class="AttributeAssignment">
            <property name="attributeValue" class="String">.json</property>
            <property name="lastKnownAttributeType" class="java.lang.Class" id="2">kapow.robot.plugin.common.domain.StringAttributeType</property>
          </property>
        </property>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String">fileNumber</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" class="SimpleTypeReference">
          <property name="simpleTypeId" class="Integer">7</property>
        </property>
        <property name="assignments" class="AttributeAssignments">
          <property name="value" class="AttributeAssignment">
            <property name="attributeValue" class="String">1</property>
            <property name="lastKnownAttributeType" class="java.lang.Class">kapow.robot.plugin.common.domain.IntegerAttributeType</property>
          </property>
        </property>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String" id="3">outputFileName</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" idref="0"/>
        <property name="assignments" class="AttributeAssignments">
          <property name="value" class="AttributeAssignment">
            <property name="attributeValue" class="String">D:\Kapow\test\.content</property>
            <property name="lastKnownAttributeType" idref="2"/>
          </property>
        </property>
      </property>
    </object>
    <object class="Variable" serializationversion="1">
      <property name="name" class="String">overviewText</property>
      <property name="initialAssignment" class="InitialVariableAssignment">
        <property name="type" class="SimpleTypeReference">
          <property name="simpleTypeId" class="Integer">13</property>
        </property>
      </property>
    </object>
  </property>
  <property name="proxyServerConfiguration" class="ProxyServerConfiguration" serializationversion="0"/>
  <property name="httpClientType" class="HttpClientType">
    <property name="enum-name" class="String">WEBKIT</property>
  </property>
  <property name="ntlmAuthentication" class="NTLMAuthenticationType">
    <property name="enum-name" class="String">STANDARD</property>
  </property>
  <property name="privateHTTPCacheEnabled" class="Boolean" id="4">true</property>
  <property name="privateHTTPCacheSize" class="Integer">2048</property>
  <property name="comment">
    <null/>
  </property>
  <property name="executionMode" class="ExecutionMode">
    <property name="enum-name" class="String">DIRECT</property>
  </property>
  <property name="transitionGraph" class="Body">
    <blockBeginStep class="BlockBeginStep" id="5"/>
    <steps class="ArrayList">
      <object class="Transition" serializationversion="0" id="6">
        <property name="name" class="String">Query Database</property>
        <property name="stepAction" class="QueryDatabase2" serializationversion="1">
          <property name="databaseName" class="kapow.robot.plugin.common.support.expression.stringexpr.DBNameValueStringExpression">
            <property name="value" class="kapow.util.db.DBName">
              <property name="name" class="String">medtronic</property>
            </property>
          </property>
          <property name="sql" class="String">"SELECT * FROM product_detail"</property>
          <property name="columnAttributeMappings" class="kapow.robot.plugin.common.support.database.ColumnAttributeMappings">
            <object class="kapow.robot.plugin.common.support.database.ColumnAttributeMapping">
              <property name="columnName" class="String">product_detail.url</property>
              <property name="attributeName" class="kapow.robot.plugin.common.support.AttributeName2">
                <property name="name" class="String">product_detail.url</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.support.database.ColumnAttributeMapping">
              <property name="columnName" class="String">product_detail.url</property>
              <property name="attributeName" class="kapow.robot.plugin.common.support.AttributeName2">
                <property name="name" class="String">product_detail.url</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.support.database.ColumnAttributeMapping">
              <property name="columnName" class="String">product_detail.hero_image</property>
              <property name="attributeName" class="kapow.robot.plugin.common.support.AttributeName2">
                <property name="name" class="String">product_detail.hero_image</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.support.database.ColumnAttributeMapping">
              <property name="columnName" class="String">product_detail.product_name</property>
              <property name="attributeName" class="kapow.robot.plugin.common.support.AttributeName2">
                <property name="name" class="String">product_detail.product_name</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.support.database.ColumnAttributeMapping">
              <property name="columnName" class="String">product_detail.audience</property>
              <property name="attributeName" class="kapow.robot.plugin.common.support.AttributeName2">
                <property name="name" class="String">product_detail.audience</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.support.database.ColumnAttributeMapping">
              <property name="columnName" class="String">product_detail.product_subtitle</property>
              <property name="attributeName" class="kapow.robot.plugin.common.support.AttributeName2">
                <property name="name" class="String">product_detail.product_subtitle</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.support.database.ColumnAttributeMapping">
              <property name="columnName" class="String">product_detail.product_subtitle</property>
              <property name="attributeName" class="kapow.robot.plugin.common.support.AttributeName2">
                <property name="name" class="String">product_detail.product_subtitle</property>
              </property>
            </object>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders" id="7"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="8">
        <property name="name" class="String">Load File</property>
        <property name="stepAction" class="LoadFile">
          <property name="fileNameExpression" class="kapow.robot.plugin.common.support.expression.stringexpr.FileNameValueStringExpression">
            <property name="value" class="String">C:\Users\S.krishnamoorthy\Desktop\evera_mri_xt_dr_and_vr_complete_JSON.json</property>
          </property>
          <property name="output" class="kapow.robot.plugin.common.stateprocessor.rest.ToVariableOutputSpecification" serializationversion="1">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">jsonOutputFile.outFile</property>
            </property>
          </property>
          <property name="browserConfigurationSpecification" class="BrowserConfigurationSpecificationWebKit" serializationversion="20">
            <property name="ancestorProvider" class="BrowserConfigurationSpecificationAncestorProviderForStep"/>
          </property>
        </property>
        <property name="elementFinders" idref="7"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="9">
        <property name="name" class="String">Open Variable</property>
        <property name="stepAction" class="OpenVariable">
          <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
            <property name="name" class="String">jsonOutputFile.outFile</property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="10">
        <property name="name" class="String">Set JSON for audience</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.audience</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.audienceType</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="11">
        <property name="name" class="String">Set JSON for URL</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.url</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.iswURL</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="12">
        <property name="name" class="String">Set JSON for productsubtitle</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.product_subtitle</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.productSubTitle</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="13">
        <property name="name" class="String">Assign Variable</property>
        <property name="stepAction" class="AssignVariable" serializationversion="2">
          <property name="stringExpr" class="Expression" serializationversion="1">
            <property name="text" class="String">"&amp;lt;p&gt;" + product_detail.overviewText + ".&amp;lt;/p&gt;"</property>
          </property>
          <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
            <property name="name" class="String">product_detail.overviewText</property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="14">
        <property name="name" class="String">Set JSON for product name</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.product_name</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.productName</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="15">
        <property name="name" class="String">Set JSON for overviewText</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.overviewText</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.overviewText</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="16">
        <property name="name" class="String">Convert Variables</property>
        <property name="stepAction" class="ConvertVariables">
          <property name="entries" class="kapow.robot.plugin.common.stateprocessor.attributeconverter.AttributeConverterEntries">
            <object class="kapow.robot.plugin.common.stateprocessor.attributeconverter.AttributeConverterEntry" serializationversion="0">
              <property name="fromAttributeName" class="kapow.robot.plugin.common.support.AttributeName">
                <property name="name" class="String">product_detail.hero_image</property>
              </property>
              <property name="dataConverters" class="DataConverters">
                <element class="AdvancedExtract2">
                  <property name="pattern" class="kapow.robot.plugin.common.support.expression.stringexpr.PatternValueStringExpression">
                    <property name="value" class="String">(.*?)(/documents)/(.*?)/(.*?)</property>
                  </property>
                  <property name="outputExpression" class="String">$2</property>
                </element>
              </property>
              <property name="toAttributeName" class="kapow.robot.plugin.common.support.AttributeName">
                <property name="name" class="String">asset</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.stateprocessor.attributeconverter.AttributeConverterEntry" serializationversion="0">
              <property name="fromAttributeName" class="kapow.robot.plugin.common.support.AttributeName">
                <property name="name" class="String">product_detail.hero_image</property>
              </property>
              <property name="dataConverters" class="DataConverters">
                <element class="AdvancedExtract2">
                  <property name="pattern" class="kapow.robot.plugin.common.support.expression.stringexpr.PatternValueStringExpression">
                    <property name="value" class="String">(.*?)(/documents)/(.*?)/(.*?)</property>
                  </property>
                  <property name="outputExpression" class="String">$3</property>
                </element>
              </property>
              <property name="toAttributeName" class="kapow.robot.plugin.common.support.AttributeName">
                <property name="name" class="String">fileType</property>
              </property>
            </object>
            <object class="kapow.robot.plugin.common.stateprocessor.attributeconverter.AttributeConverterEntry" serializationversion="0">
              <property name="fromAttributeName" class="kapow.robot.plugin.common.support.AttributeName">
                <property name="name" class="String">product_detail.hero_image</property>
              </property>
              <property name="dataConverters" class="DataConverters">
                <element class="AdvancedExtract2">
                  <property name="pattern" class="kapow.robot.plugin.common.support.expression.stringexpr.PatternValueStringExpression">
                    <property name="value" class="String">(.*?)(/documents)/(.*?)/(.*?)</property>
                  </property>
                  <property name="outputExpression" class="String">$4</property>
                </element>
              </property>
              <property name="toAttributeName" class="kapow.robot.plugin.common.support.AttributeName">
                <property name="name" class="String">fileName</property>
              </property>
            </object>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0">
          <property name="reportingViaAPI" class="Boolean">false</property>
          <property name="reportingViaLog" class="Boolean">false</property>
          <property name="controlFlow" class="kapow.robot.robomaker.robot.ControlFlow$IgnoreAndContinue"/>
        </property>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="17">
        <property name="name" class="String">Assign Variable</property>
        <property name="stepAction" class="AssignVariable" serializationversion="2">
          <property name="stringExpr" class="Expression" serializationversion="1">
            <property name="text" class="String">"\{&amp;quot;path&amp;quot;:&amp;quot;/content/dam/medtronic-com/" + asset + fileType + fileName +"&amp;quot;,&amp;quot;altText&amp;quot;:&amp;quot;" +product_detail. product_name +"&amp;quot;}"</property>
          </property>
          <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
            <property name="name" class="String">product_detail.hero_image</property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0">
          <property name="reportingViaAPI" class="Boolean">false</property>
          <property name="reportingViaLog" class="Boolean">false</property>
          <property name="controlFlow" class="kapow.robot.robomaker.robot.ControlFlow$IgnoreAndContinue"/>
        </property>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="18">
        <property name="name" class="String">Set JSON for image</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.image</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.image</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0">
          <property name="reportingViaAPI" class="Boolean">false</property>
          <property name="reportingViaLog" class="Boolean">false</property>
          <property name="controlFlow" class="kapow.robot.robomaker.robot.ControlFlow$IgnoreAndContinue"/>
        </property>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="19">
        <property name="name" class="String">Set JSON for overviewText</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.overviewText</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.overviewText</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" class="Boolean" id="20">false</property>
      </object>
      <object class="Transition" serializationversion="0" id="21">
        <property name="name" class="String">Set JSON for product Name</property>
        <property name="stepAction" class="SetJSONStepAction">
          <property name="newContent" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">product_detail.product_name</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders">
          <object class="kapow.robot.robomaker.state.document.elementfinder.json.JSONElementFinder">
            <property name="nodePath" class="kapow.robot.plugin.common.support.expression.stringexpr.ValueStringExpression">
              <property name="value" class="String">@top:.root.content.content-par.product-detail.productName</property>
            </property>
          </object>
        </property>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="20"/>
      </object>
      <object class="Transition" serializationversion="0" id="22">
        <property name="name" class="String">Assign FileName</property>
        <property name="stepAction" class="AssignVariable" serializationversion="2">
          <property name="stringExpr" class="Expression" serializationversion="1">
            <property name="text" class="String">outputFileName + fileNumber +extension</property>
          </property>
          <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
            <property name="name" idref="3"/>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="23">
        <property name="name" class="String">Write File</property>
        <property name="stepAction" class="WriteFile" serializationversion="0">
          <property name="fileNameExpression" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" idref="3"/>
            </property>
          </property>
          <property name="fileContentExpression" class="kapow.robot.plugin.common.support.expression.multipletype.VariableExpression" serializationversion="2">
            <property name="variable" class="kapow.robot.plugin.common.support.AttributeName2">
              <property name="name" class="String">jsonOutputFile.outFile</property>
            </property>
          </property>
        </property>
        <property name="elementFinders" class="ElementFinders"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="Transition" serializationversion="0" id="24">
        <property name="name" class="String">Return Value</property>
        <property name="stepAction" class="ReturnVariable" serializationversion="1">
          <property name="variableName" class="kapow.robot.plugin.common.support.VariableName">
            <property name="name" idref="1"/>
          </property>
        </property>
        <property name="elementFinders" idref="7"/>
        <property name="errorHandler" class="ErrorHandler" serializationversion="0"/>
        <property name="comment">
          <null/>
        </property>
        <property name="enabled" idref="4"/>
      </object>
      <object class="End" id="25"/>
    </steps>
    <blockEndStep class="BlockEndStep"/>
    <edges class="ArrayList">
      <object class="TransitionEdge">
        <from idref="5"/>
        <to idref="6"/>
      </object>
      <object class="TransitionEdge">
        <from idref="6"/>
        <to idref="8"/>
      </object>
      <object class="TransitionEdge">
        <from idref="8"/>
        <to idref="9"/>
      </object>
      <object class="TransitionEdge">
        <from idref="9"/>
        <to idref="10"/>
      </object>
      <object class="TransitionEdge">
        <from idref="10"/>
        <to idref="11"/>
      </object>
      <object class="TransitionEdge">
        <from idref="11"/>
        <to idref="12"/>
      </object>
      <object class="TransitionEdge">
        <from idref="12"/>
        <to idref="13"/>
      </object>
      <object class="TransitionEdge">
        <from idref="13"/>
        <to idref="14"/>
      </object>
      <object class="TransitionEdge">
        <from idref="14"/>
        <to idref="15"/>
      </object>
      <object class="TransitionEdge">
        <from idref="15"/>
        <to idref="16"/>
      </object>
      <object class="TransitionEdge">
        <from idref="16"/>
        <to idref="17"/>
      </object>
      <object class="TransitionEdge">
        <from idref="17"/>
        <to idref="18"/>
      </object>
      <object class="TransitionEdge">
        <from idref="18"/>
        <to idref="19"/>
      </object>
      <object class="TransitionEdge">
        <from idref="19"/>
        <to idref="21"/>
      </object>
      <object class="TransitionEdge">
        <from idref="21"/>
        <to idref="22"/>
      </object>
      <object class="TransitionEdge">
        <from idref="22"/>
        <to idref="23"/>
      </object>
      <object class="TransitionEdge">
        <from idref="23"/>
        <to idref="24"/>
      </object>
      <object class="TransitionEdge">
        <from idref="24"/>
        <to idref="25"/>
      </object>
    </edges>
  </property>
  <property name="browserConfigurationSpecification" class="BrowserConfigurationSpecificationWebKit" serializationversion="20"/>
</object>
