import Foundation
import EventKit
import React

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  @objc(addEvent:location:startDate:endDate:resolver:rejecter:)
  func addEvent(name: String, location: String, startDate: String, endDate: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let eventStore = EKEventStore()
    
    eventStore.requestAccess(to: .event) { (granted, error) in
      if let error = error {
        reject("EVENT_CREATION_ERROR", "Could not create event", error)
        return
      }

      if granted {
        let event = EKEvent(eventStore: eventStore)
        event.title = name
        event.location = location

        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZZZZZ"
        
        if let startDateTime = dateFormatter.date(from: startDate),
           let endDateTime = dateFormatter.date(from: endDate) {
          event.startDate = startDateTime
          event.endDate = endDateTime
        } else {
          reject("DATE_FORMAT_ERROR", "Invalid date or time format", nil)
          return
        }

        event.calendar = eventStore.defaultCalendarForNewEvents

        do {
          try eventStore.save(event, span: .thisEvent)
          resolve(event.eventIdentifier)
        } catch let saveError {
          reject("EVENT_CREATION_ERROR", "Could not save event", saveError)
        }
      } else {
        reject("EVENT_CREATION_ERROR", "Access to calendar not granted", nil)
      }
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
