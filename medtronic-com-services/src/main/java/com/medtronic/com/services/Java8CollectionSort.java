package com.medtronic.com.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.text.Collator;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ResourceResolver;
import com.medtronic.com.services.KeyValue;

public class Java8CollectionSort {

    public static void sort(List<KeyValue> languages, Locale locale) {

      final Collator langCollator = Collator.getInstance(locale);

      Collections.sort(languages, new Comparator<KeyValue>() {
        public int compare(KeyValue o1, KeyValue o2) {
            return langCollator.compare(o1.getValue(), o2.getValue());
        }
      });
    }
}
